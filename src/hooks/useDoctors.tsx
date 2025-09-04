import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Doctor {
  id: string;
  license_number: string;
  practice_name: string | null;
  specialty_category: string;
  qualification: string | null;
  experience_years: number | null;
  consultation_fee: number | null;
  address: string | null;
  max_appointments_per_day: number | null;
  working_hours_start: string | null;
  working_hours_end: string | null;
  working_days: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  // Joined data
  full_name?: string;
  email?: string;
  phone?: string | null;
  profile_id: string;
}

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();

  const fetchDoctors = async (filters?: {
    specialty?: string;
    search?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase // change to firebase
        .from('doctors')
        .select(`
          *,
          profiles!inner(
            full_name,
            email,
            phone,
            user_type
          )
        `)
        .eq('profiles.user_type', 'doctor');

      // Apply filters
      if (filters?.specialty && filters.specialty !== 'All') {
        query = query.eq('specialty_category', filters.specialty);
      }

      if (filters?.search) {
        query = query.or(`profiles.full_name.ilike.%${filters.search}%,specialty_category.ilike.%${filters.search}%`);
      }

      const { data, error: fetchError } = await query.order('profiles.full_name', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our interface
      const transformedDoctors: Doctor[] = data?.map(doctor => ({
        id: doctor.id,
        license_number: doctor.license_number,
        practice_name: doctor.practice_name,
        specialty_category: doctor.specialty_category,
        qualification: doctor.qualification,
        experience_years: doctor.experience_years,
        consultation_fee: doctor.consultation_fee,
        address: doctor.address,
        max_appointments_per_day: doctor.max_appointments_per_day,
        working_hours_start: doctor.working_hours_start,
        working_hours_end: doctor.working_hours_end,
        working_days: doctor.working_days,
        created_at: doctor.created_at,
        updated_at: doctor.updated_at,
        profile_id: doctor.profile_id,
        full_name: doctor.profiles?.full_name,
        email: doctor.profiles?.email,
        phone: doctor.profiles?.phone,
      })) || [];

      setDoctors(transformedDoctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const getDoctorById = async (doctorId: string) => {
    try {
      const { data, error } = await supabase // change to firebase
        .from('doctors')
        .select(`
          *,
          profiles!inner(
            full_name,
            email,
            phone,
            user_type
          )
        `)
        .eq('id', doctorId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        license_number: data.license_number,
        practice_name: data.practice_name,
        specialty_category: data.specialty_category,
        qualification: data.qualification,
        experience_years: data.experience_years,
        consultation_fee: data.consultation_fee,
        address: data.address,
        max_appointments_per_day: data.max_appointments_per_day,
        working_hours_start: data.working_hours_start,
        working_hours_end: data.working_hours_end,
        working_days: data.working_days,
        created_at: data.created_at,
        updated_at: data.updated_at,
        profile_id: data.profile_id,
        full_name: data.profiles?.full_name,
        email: data.profiles?.email,
        phone: data.profiles?.phone,
      };
    } catch (err) {
      console.error('Error fetching doctor:', err);
      throw err;
    }
  };

  const getAvailableTimeSlots = async (doctorId: string, date: string) => {
    try {
      // Get doctor's working hours
      const doctor = await getDoctorById(doctorId);
      if (!doctor) throw new Error('Doctor not found');

      // Get existing appointments for the date
      const { data: existingAppointments, error } = await supabase // change to firebase
        .from('appointments')
        .select('appointment_time')
        .eq('doctor_id', doctorId)
        .eq('appointment_date', date)
        .in('status', ['confirmed', 'pending']);

      if (error) throw error;

      // Generate available time slots
      const workingStart = doctor.working_hours_start || '09:00';
      const workingEnd = doctor.working_hours_end || '17:00';
      const bookedTimes = existingAppointments?.map(apt => apt.appointment_time) || [];

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
  };

  const getSpecialties = async () => {
    try {
      const { data, error } = await supabase // change to firebase
        .from('doctors')
        .select('specialty_category')
        .not('specialty_category', 'is', null);

      if (error) throw error;

      const specialties = [...new Set(data?.map(d => d.specialty_category))];
      return ['All', ...specialties.sort()];
    } catch (err) {
      console.error('Error fetching specialties:', err);
      return ['All'];
    }
  };

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
