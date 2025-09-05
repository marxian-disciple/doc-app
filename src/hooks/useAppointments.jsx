import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import {
  collection,
  query,
  where,
  getDocs,
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
    if (!user || !profile?.id) return;

    setLoading(true);
    setError(null);

    try {
      let q = collection(db, 'appointments');

      // Only fetch appointments relevant to this user
      if (profile.user_type === 'patient') {
        q = query(q, where('patientId', '==', profile.id), orderBy('createdAt', 'desc'));
      } else if (profile.user_type === 'doctor') {
        q = query(q, where('doctorId', '==', profile.id), orderBy('createdAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  }, [user, profile]);

  // Confirm appointment: move to confirmed_appointments with status
  const confirmAppointment = useCallback(
    async (appointmentId) => {
      if (!user) return;

      try {
        const docRef = doc(db, 'appointments', appointmentId);
        const snapshot = await getDocs(query(collection(db, 'appointments')));
        const appointment = snapshot.docs.find((d) => d.id === appointmentId)?.data();

        if (!appointment) throw new Error('Appointment not found');

        // Move to confirmed_appointments
        const confirmedRef = doc(db, 'confirmed_appointments', appointmentId);
        await setDoc(confirmedRef, {
          ...appointment,
          status: 'confirmed',
          confirmedAt: new Date().toISOString(),
        });

        // Remove from appointments collection
        await deleteDoc(docRef);

        await fetchAppointments();
      } catch (err) {
        console.error('Error confirming appointment:', err);
        throw err;
      }
    },
    [fetchAppointments, user]
  );

  // Cancel appointment: update status in appointments
  const cancelAppointment = useCallback(
    async (appointmentId) => {
      if (!user) return;

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
    [fetchAppointments, user]
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
    if (user && profile) fetchAppointments();
  }, [user, profile, fetchAppointments]);

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
