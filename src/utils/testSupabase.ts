import { supabase } from '@/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  try {
    console.log('=== TESTING SUPABASE CONNECTION ===');
    
    // Test 1: Check if we can connect to Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Test 2: Check auth status
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('Current user:', user);
    console.log('Auth error:', authError);
    
    // Test 3: Check if we can read from profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);
    
    console.log('Profiles:', profiles);
    console.log('Profiles error:', profilesError);
    
    // Test 4: Check if we can read from doctors table
    const { data: doctors, error: doctorsError } = await supabase
      .from('doctors')
      .select('*')
      .limit(5);
    
    console.log('Doctors:', doctors);
    console.log('Doctors error:', doctorsError);
    
    // Test 5: Check if we can read from patients table
    const { data: patients, error: patientsError } = await supabase
      .from('patients')
      .select('*')
      .limit(5);
    
    console.log('Patients:', patients);
    console.log('Patients error:', patientsError);
    
    console.log('=== END SUPABASE TEST ===');
    return true;
    
  } catch (error) {
    console.error('Supabase test error:', error);
    return false;
  }
};
