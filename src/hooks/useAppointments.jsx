import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const useAppointments = () => {
  const { user, profile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    if (!user || !profile?.uid) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let q = collection(db, 'appointments');

      if (profile.user_type === 'doctor') {
        q = query(q, where('doctorId', '==', profile.uid), orderBy('createdAt', 'desc'));
      } else if (profile.user_type === 'patient') {
        q = query(q, where('patientId', '==', profile.uid), orderBy('createdAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, [user, profile]);

  const confirmAppointment = useCallback(
    async (appointmentId) => {
      try {
        const docRef = doc(db, 'appointments', appointmentId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) throw new Error('Appointment not found');
        const appointment = docSnap.data();

        const confirmedRef = doc(db, 'confirmed_appointments', appointmentId);
        await setDoc(confirmedRef, {
          ...appointment,
          status: 'confirmed',
          confirmedAt: new Date().toISOString(),
        });

        await deleteDoc(docRef);

        await fetchAppointments();
      } catch (err) {
        console.error('Error confirming appointment:', err);
        throw err;
      }
    },
    [fetchAppointments]
  );

  const cancelAppointment = useCallback(
    async (appointmentId) => {
      try {
        const docRef = doc(db, 'appointments', appointmentId);
        await setDoc(
          docRef,
          { status: 'cancelled', cancelledAt: new Date().toISOString() },
          { merge: true }
        );

        await fetchAppointments();
      } catch (err) {
        console.error('Error cancelling appointment:', err);
        throw err;
      }
    },
    [fetchAppointments]
  );

  const createAppointment = useCallback(
    async (appointmentData) => {
      try {
        const docRef = doc(collection(db, 'appointments'));
        await setDoc(docRef, { ...appointmentData, status: 'pending', createdAt: new Date().toISOString() });
        await fetchAppointments();
      } catch (err) {
        console.error('Error creating appointment:', err);
        throw err;
      }
    },
    [fetchAppointments]
  );

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    createAppointment,
    confirmAppointment,
    cancelAppointment,
  };
};
