import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { db } from '../firebase/firebase'; // your Firestore instance
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch doctors with optional filters
  const fetchDoctors = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      let q = query(
        collection(db, 'profiles'),
        where('user_type', '==', 'doctor')
      );

      // Firestore cannot OR across multiple fields easily.
      // Specialty filter
      if (filters?.specialty && filters.specialty !== 'All') {
        q = query(
          collection(db, 'profiles'),
          where('user_type', '==', 'doctor'),
          where('specialty', '==', filters.specialty)
        );
      }

      const snapshot = await getDocs(q);

      let data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      // Apply search client-side (on full_name or email)
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        data = data.filter(
          (d) =>
            d.full_name?.toLowerCase().includes(searchLower) ||
            d.email?.toLowerCase().includes(searchLower)
        );
      }

      setDoctors(data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  }, []);

  const getDoctorById = useCallback(async (doctorId) => {
    try {
      const docRef = doc(db, 'profiles', doctorId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) throw new Error('Doctor not found');

      return { id: docSnap.id, ...docSnap.data() };
    } catch (err) {
      console.error('Error fetching doctor:', err);
      throw err;
    }
  }, []);

  const getAvailableTimeSlots = useCallback(async (doctorId, date) => {
    try {
      // ✅ Call getDoctorById directly instead of using it as dependency
      const docRef = doc(db, 'profiles', doctorId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error('Doctor not found');
      const doctor = { id: docSnap.id, ...docSnap.data() };
      
      // ... rest of your existing logic
      const workingStart = doctor.working_hours_start || '09:00';
      const workingEnd = doctor.working_hours_end || '17:00';
      const bookedTimes = existingAppointments.map((apt) => apt) || [];
      const timeSlots = [];
      const startHour = parseInt(workingStart.split(':')[0]);
      const endHour = parseInt(workingEnd.split(':')[0]);
      for (let hour = startHour; hour < endHour; hour++) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
        if (!bookedTimes.includes(timeSlot)) {
          timeSlots.push(timeSlot);
        }
      }
      return timeSlots;
    } catch (err) {
      console.error('Error fetching available time slots:', err);
      throw err;
    }
  }, []); // ✅ Empty dependency array

  const getSpecialties = useCallback(async () => {
    try {
      const q = query(collection(db, 'profiles'), where('user_type', '==', 'doctor'));
      const snapshot = await getDocs(q);

      const specialties = snapshot.docs
        .map((docSnap) => docSnap.data().specialty)
        .filter(Boolean);

      return ['All', ...new Set(specialties.sort())];
    } catch (err) {
      console.error('Error fetching specialties:', err);
      return ['All'];
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
    getDoctorById,
    getAvailableTimeSlots,
    getSpecialties,
  };
};
