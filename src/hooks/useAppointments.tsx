import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  reason: string | null;
  notes: string | null;
  diagnosis: string | null;
  prescription: string | null;
  symptoms: string | null;
  created_at: string | null;
  updated_at: string | null;
  // Joined data
  patient_name?: string;
  doctor_name?: string;
  specialty?: string;
  patient_id: string;
  doctor_id: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();

  const fetchAppointments = async () => {
    if (!user || !profile) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('appointments')
        .select(`
          *,
          patients!inner(
            id,
            profile_id,
            profiles!inner(
              full_name,
              user_type
            )
          ),
          doctors!inner(
            id,
            specialty_category,
            profiles!inner(
              full_name,
              user_type
            )
          )
        `);

      // Filter based on user type
      if (profile.user_type === 'patient') {
        // Patients can only see their own appointments
        query = query.eq('patients.profile_id', profile.id);
      } else if (profile.user_type === 'doctor') {
        // Doctors can see appointments with their patients
        query = query.eq('doctors.profile_id', profile.id);
      }

      const { data, error: fetchError } = await query.order('appointment_date', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our interface
      const transformedAppointments: Appointment[] = data?.map(appointment => ({
        id: appointment.id,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        status: appointment.status,
        reason: appointment.reason,
        notes: appointment.notes,
        diagnosis: appointment.diagnosis,
        prescription: appointment.prescription,
        symptoms: appointment.symptoms,
        created_at: appointment.created_at,
        updated_at: appointment.updated_at,
        patient_id: appointment.patient_id,
        doctor_id: appointment.doctor_id,
        patient_name: appointment.patients?.profiles?.full_name,
        doctor_name: appointment.doctors?.profiles?.full_name,
        specialty: appointment.doctors?.specialty_category,
      })) || [];

      setAppointments(transformedAppointments);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: {
    patient_id: string;
    doctor_id: string;
    appointment_date: string;
    appointment_time: string;
    reason?: string;
    status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  }) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([appointmentData])
        .select()
        .single();

      if (error) throw error;

      // Refresh the appointments list
      await fetchAppointments();
      return data;
    } catch (err) {
      console.error('Error creating appointment:', err);
      throw err;
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Refresh the appointments list
      await fetchAppointments();
      return data;
    } catch (err) {
      console.error('Error updating appointment:', err);
      throw err;
    }
  };

  const cancelAppointment = async (id: string) => {
    return updateAppointment(id, { status: 'cancelled' });
  };

  const confirmAppointment = async (id: string) => {
    return updateAppointment(id, { status: 'confirmed' });
  };

  const completeAppointment = async (id: string, diagnosis?: string, prescription?: string, notes?: string) => {
    return updateAppointment(id, { 
      status: 'completed',
      diagnosis,
      prescription,
      notes
    });
  };

  useEffect(() => {
    if (user && profile) {
      fetchAppointments();
    }
  }, [user, profile]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    confirmAppointment,
    completeAppointment,
  };
};
