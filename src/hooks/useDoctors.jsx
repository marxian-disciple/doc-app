import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
// import your Firebase client here
// import { db } from './firebase';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, profile } = useAuth();

  const fetchDoctors = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with Firebase query
      // let query = db.collection('doctors');
      // if (filters?.specialty && filters.specialty !== 'All') {
      //   query = query.where('specialty_category', '==', filters.specialty);
      // }
      // if (filters?.search) {
      //   // Firebase does not support OR on fields easily; consider client-side filtering
      // }

      const data = []; // Replace with transformed Firebase data

      const transformedDoctors = data.map((doctor) => ({
        id: doctor.id,
        license_number: doctor.license_number,
        practice_name: doctor.practice_name || null,
        specialty_category: doctor.specialty_category,
        qualification: doctor.qualification || null,
        experience_years: doctor.experience_years || null,
        consultation_fee: doctor.consultation_fee || null,
        address: doctor.address || null,
        max_appointments_per_day: doctor.max_appointments_per_day || null,
        working_hours_start: doctor.working_hours_start || null,
        working_hours_end: doctor.working_hours_end || null,
        working_days: doctor.working_days || null,
        created_at: doctor.created_at || null,
        updated_at: doctor.updated_at || null,
        profile_id: doctor.profile_id,
        full_name: doctor.full_name || null,
        email: doctor.email || null,
        phone: doctor.phone || null,
      }));

      setDoctors(transformedDoctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const getDoctorById = async (doctorId) => {
    try {
      // TODO: Replace with Firebase query
      // const doc = await db.collection('doctors').doc(doctorId).get();
      // const data = doc.data();

      const data = null; // Replace with Firebase data

      if (!data) throw new Error('Doctor not found');

      return {
        id: data.id,
        license_number: data.license_number,
        practice_name: data.practice_name || null,
        specialty_category: data.specialty_category,
        qualification: data.qualification || null,
        experience_years: data.experience_years || null,
        consultation_fee: data.consultation_fee || null,
        address: data.address || null,
        max_appointments_per_day: data.max_appointments_per_day || null,
        working_hours_start: data.working_hours_start || null,
        working_hours_end: data.working_hours_end || null,
        working_days: data.working_days || null,
        created_at: data.created_at || null,
        updated_at: data.updated_at || null,
        profile_id: data.profile_id,
        full_name: data.full_name || null,
        email: data.email || null,
        phone: data.phone || null,
      };
    } catch (err) {
      console.error('Error fetching doctor:', err);
      throw err;
    }
  };

  const getAvailableTimeSlots = async (doctorId, date) => {
    try {
      const doctor = await getDoctorById(doctorId);
      if (!doctor) throw new Error('Doctor not found');

      // TODO: Replace with Firebase query to get existing appointments
      const existingAppointments = []; // Array of appointment_time strings

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
  };

  const getSpecialties = async () => {
    try {
      // TODO: Replace with Firebase query
      const data = []; // Replace with Firebase array of specialties
      const specialties = [...new Set(data.map((d) => d.specialty_category))];
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
