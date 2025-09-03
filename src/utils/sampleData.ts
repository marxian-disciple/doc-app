import { supabase } from '@/integrations/supabase/client';

// This is a utility function to add sample data for testing
// Only use this in development/testing environments
export const addSampleData = async () => {
  try {
    console.log('Adding sample data...');

    // First, let's check if we have any doctors
    const { data: existingDoctors } = await supabase
      .from('doctors')
      .select('id')
      .limit(1);

    if (existingDoctors && existingDoctors.length > 0) {
      console.log('Sample data already exists');
      return;
    }

    // Get the first doctor profile (if any)
    const { data: doctorProfiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_type', 'doctor')
      .limit(1);

    if (!doctorProfiles || doctorProfiles.length === 0) {
      console.log('No doctor profiles found. Please register a doctor first.');
      return;
    }

    const doctorProfileId = doctorProfiles[0].id;

    // Get the first patient profile (if any)
    const { data: patientProfiles } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_type', 'patient')
      .limit(1);

    if (!patientProfiles || patientProfiles.length === 0) {
      console.log('No patient profiles found. Please register a patient first.');
      return;
    }

    const patientProfileId = patientProfiles[0].id;

    // Create a doctor record
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .insert({
        profile_id: doctorProfileId,
        license_number: 'MD123456',
        practice_name: 'City Medical Center',
        specialty_category: 'general',
        experience_years: 10,
        consultation_fee: 150,
        address: '123 Medical St, City, State',
        working_hours_start: '09:00',
        working_hours_end: '17:00',
        working_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      })
      .select()
      .single();

    if (doctorError) {
      console.error('Error creating doctor:', doctorError);
      return;
    }

    // Create a patient record
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .insert({
        profile_id: patientProfileId,
        id_number: 'ID123456789',
        medical_aid: 'HealthPlus Insurance',
        address: '456 Patient Ave, City, State',
        date_of_birth: '1990-01-01',
        emergency_contact: 'Jane Doe',
        emergency_phone: '555-0123',
        medical_history: 'No significant medical history',
        current_medications: 'None',
        allergies: 'None known'
      })
      .select()
      .single();

    if (patientError) {
      console.error('Error creating patient:', patientError);
      return;
    }

    // Create a sample appointment
    const { data: appointment, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        patient_id: patient.id,
        doctor_id: doctor.id,
        appointment_date: '2024-02-15',
        appointment_time: '10:00',
        status: 'confirmed',
        reason: 'Annual checkup'
      })
      .select()
      .single();

    if (appointmentError) {
      console.error('Error creating appointment:', appointmentError);
      return;
    }

    // Create a sample medical record
    const { error: recordError } = await supabase
      .from('medical_records')
      .insert({
        patient_id: patient.id,
        doctor_id: doctor.id,
        appointment_id: appointment.id,
        visit_date: '2024-02-15',
        diagnosis: 'Healthy - no issues found',
        symptoms: 'None reported',
        prescription: 'Continue current lifestyle',
        notes: 'Patient is in good health. Recommended annual checkup in one year.',
        follow_up_required: true,
        follow_up_date: '2025-02-15'
      });

    if (recordError) {
      console.error('Error creating medical record:', recordError);
      return;
    }

    console.log('Sample data added successfully!');
    console.log('Created:', { doctor: doctor.id, patient: patient.id, appointment: appointment.id });

  } catch (error) {
    console.error('Error adding sample data:', error);
  }
};

// Function to clear all sample data (use with caution)
export const clearSampleData = async () => {
  try {
    console.log('Clearing sample data...');
    
    // Delete in reverse order due to foreign key constraints
    await supabase.from('medical_records').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('appointments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('patients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('doctors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('Sample data cleared successfully!');
  } catch (error) {
    console.error('Error clearing sample data:', error);
  }
};
