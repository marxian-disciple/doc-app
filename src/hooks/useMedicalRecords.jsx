import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
// import your firebase client here
// import { db } from './firebase';

export const useMedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, profile } = useAuth();

  const fetchMedicalRecords = async () => {
    if (!user || !profile) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: replace with Firebase query
      // Example Firebase call:
      // let query = db.collection('medical_records');
      // if (profile.user_type === 'patient') query = query.where('patient_id', '==', profile.id);
      // if (profile.user_type === 'doctor') query = query.where('doctor_id', '==', profile.id);
      // const snapshot = await query.orderBy('visit_date', 'desc').get();

      const data = []; // Replace with transformed snapshot data from Firebase

      const transformedRecords = data.map(record => ({
        id: record.id,
        visit_date: record.visit_date,
        diagnosis: record.diagnosis || null,
        symptoms: record.symptoms || null,
        prescription: record.prescription || null,
        notes: record.notes || null,
        follow_up_required: record.follow_up_required || null,
        follow_up_date: record.follow_up_date || null,
        created_at: record.created_at || null,
        updated_at: record.updated_at || null,
        appointment_id: record.appointment_id || null,
        patient_name: record.patient_name || null,
        doctor_name: record.doctor_name || null,
        specialty: record.specialty || null,
      }));

      setRecords(transformedRecords);
    } catch (err) {
      console.error('Error fetching medical records:', err);
      setError(err.message || 'Failed to fetch medical records');
    } finally {
      setLoading(false);
    }
  };

  const createMedicalRecord = async (recordData) => {
    try {
      // TODO: replace with Firebase insert
      // await db.collection('medical_records').add(recordData);

      await fetchMedicalRecords();
    } catch (err) {
      console.error('Error creating medical record:', err);
      throw err;
    }
  };

  const updateMedicalRecord = async (id, updates) => {
    try {
      // TODO: replace with Firebase update
      // await db.collection('medical_records').doc(id).update(updates);

      await fetchMedicalRecords();
    } catch (err) {
      console.error('Error updating medical record:', err);
      throw err;
    }
  };

  const deleteMedicalRecord = async (id) => {
    try {
      // TODO: replace with Firebase delete
      // await db.collection('medical_records').doc(id).delete();

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
