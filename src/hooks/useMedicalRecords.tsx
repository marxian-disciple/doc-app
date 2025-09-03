import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface MedicalRecord {
  id: string;
  visit_date: string;
  diagnosis: string | null;
  symptoms: string | null;
  prescription: string | null;
  notes: string | null;
  follow_up_required: boolean | null;
  follow_up_date: string | null;
  created_at: string | null;
  updated_at: string | null;
  // Joined data
  patient_name?: string;
  doctor_name?: string;
  specialty?: string;
  appointment_id?: string | null;
}

export const useMedicalRecords = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile } = useAuth();

  const fetchMedicalRecords = async () => {
    if (!user || !profile) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('medical_records')
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
        // Patients can only see their own records
        query = query.eq('patients.profile_id', profile.id);
      } else if (profile.user_type === 'doctor') {
        // Doctors can see records for their patients
        query = query.eq('doctors.profile_id', profile.id);
      }

      const { data, error: fetchError } = await query.order('visit_date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the data to match our interface
      const transformedRecords: MedicalRecord[] = data?.map(record => ({
        id: record.id,
        visit_date: record.visit_date,
        diagnosis: record.diagnosis,
        symptoms: record.symptoms,
        prescription: record.prescription,
        notes: record.notes,
        follow_up_required: record.follow_up_required,
        follow_up_date: record.follow_up_date,
        created_at: record.created_at,
        updated_at: record.updated_at,
        appointment_id: record.appointment_id,
        patient_name: record.patients?.profiles?.full_name,
        doctor_name: record.doctors?.profiles?.full_name,
        specialty: record.doctors?.specialty_category,
      })) || [];

      setRecords(transformedRecords);
    } catch (err) {
      console.error('Error fetching medical records:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch medical records');
    } finally {
      setLoading(false);
    }
  };

  const createMedicalRecord = async (recordData: {
    patient_id: string;
    doctor_id: string;
    visit_date: string;
    diagnosis?: string;
    symptoms?: string;
    prescription?: string;
    notes?: string;
    follow_up_required?: boolean;
    follow_up_date?: string;
    appointment_id?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .insert([recordData])
        .select()
        .single();

      if (error) throw error;

      // Refresh the records list
      await fetchMedicalRecords();
      return data;
    } catch (err) {
      console.error('Error creating medical record:', err);
      throw err;
    }
  };

  const updateMedicalRecord = async (id: string, updates: Partial<MedicalRecord>) => {
    try {
      const { data, error } = await supabase
        .from('medical_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Refresh the records list
      await fetchMedicalRecords();
      return data;
    } catch (err) {
      console.error('Error updating medical record:', err);
      throw err;
    }
  };

  const deleteMedicalRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medical_records')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh the records list
      await fetchMedicalRecords();
    } catch (err) {
      console.error('Error deleting medical record:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user && profile) {
      fetchMedicalRecords();
    }
  }, [user, profile]);

  return {
    records,
    loading,
    error,
    refetch: fetchMedicalRecords,
    createRecord: createMedicalRecord,
    updateRecord: updateMedicalRecord,
    deleteRecord: deleteMedicalRecord,
  };
};
