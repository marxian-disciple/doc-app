import { toast } from 'sonner';

// Debug function to check registration status
export const debugRegistration = async () => {
  try {
    console.log('=== DEBUGGING REGISTRATION ===');
    
    // Check current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    console.log('Current user:', user);
    console.log('User error:', userError);
    
    if (user) {
      console.log('User metadata:', user.user_metadata);
      console.log('User email confirmed:', user.email_confirmed_at);
      
      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      console.log('Profile:', profile);
      console.log('Profile error:', profileError);
      
      if (profile) {
        // Check if patient/doctor record exists
        if (profile.user_type === 'patient') {
          const { data: patient, error: patientError } = await supabase
            .from('patients')
            .select('*')
            .eq('profile_id', profile.id)
            .single();
          
          console.log('Patient record:', patient);
          console.log('Patient error:', patientError);
        } else if (profile.user_type === 'doctor') {
          const { data: doctor, error: doctorError } = await supabase
            .from('doctors')
            .select('*')
            .eq('profile_id', profile.id)
            .single();
          
          console.log('Doctor record:', doctor);
          console.log('Doctor error:', doctorError);
        }
      }
    }
    
    console.log('=== END DEBUG ===');
  } catch (error) {
    console.error('Debug error:', error);
  }
};

// Function to manually complete registration (for development)
export const completeRegistrationManually = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      toast.error('No user found. Please register first.');
      return;
    }
    
    const metadata = user.user_metadata;
    console.log('Completing registration for user:', user.email);
    console.log('Metadata:', metadata);
    
    // Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileError) {
      console.error('Profile not found:', profileError);
      toast.error('Profile not found. Please try registering again.');
      return;
    }
    
    console.log('Found profile:', profile);
    
    // Create patient or doctor record
    if (metadata.user_type === 'patient' && profile.user_type === 'patient') {
      const { error } = await supabase
        .from('patients')
        .insert({
          profile_id: profile.id,
          id_number: metadata.id_number || 'DEV123456',
          medical_aid: metadata.medical_aid || 'Development Insurance',
        });
      
      if (error) {
        console.error('Error creating patient record:', error);
        toast.error('Failed to create patient record: ' + error.message);
      } else {
        toast.success('Patient registration completed successfully!');
      }
    } else if (metadata.user_type === 'doctor' && profile.user_type === 'doctor') {
      const { error } = await supabase
        .from('doctors')
        .insert({
          profile_id: profile.id,
          license_number: metadata.license_number || 'DEV123456',
          practice_name: metadata.practice_name || 'Development Practice',
          specialty_category: metadata.specialty_category || 'general',
        });
      
      if (error) {
        console.error('Error creating doctor record:', error);
        toast.error('Failed to create doctor record: ' + error.message);
      } else {
        toast.success('Doctor registration completed successfully!');
      }
    }
    
  } catch (error) {
    console.error('Manual completion error:', error);
    toast.error('Failed to complete registration: ' + (error.message));
  }
};

// Function to sign out and clear session
export const clearSession = async () => {
  try {
    await supabase.auth.signOut();
    toast.success('Session cleared');
  } catch (error) {
    console.error('Error clearing session:', error);
    toast.error('Failed to clear session');
  }
};

// Function to manually create a profile (bypassing the trigger)
export const createProfileManually = async (user) => {
  try {
    console.log('Creating profile manually for user:', user.id);
    
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        user_type: user.user_metadata?.user_type || 'patient',
        full_name: user.user_metadata?.full_name || '',
        email: user.email || '',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile manually:', error);
      throw error;
    }

    console.log('Profile created successfully:', data);
    return data;
  } catch (error) {
    console.error('Failed to create profile manually:', error);
    throw error;
  }
};

// Complete registration bypass function
export const completeRegistrationBypass = async () => {
  try {
    console.log('=== COMPLETING REGISTRATION BYPASS ===');
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      toast.error('No user found. Please register first.');
      return;
    }

    console.log('Current user:', user);
    console.log('User metadata:', user.user_metadata);

    // Check if profile already exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    let profile;
    
    if (profileCheckError && profileCheckError.code === 'PGRST116') {
      // Profile doesn't exist, create it manually
      console.log('Profile does not exist, creating manually...');
      profile = await createProfileManually(user);
    } else if (existingProfile) {
      console.log('Profile already exists:', existingProfile);
      profile = existingProfile;
    } else {
      throw profileCheckError;
    }

    // Create patient or doctor record
    const userType = user.user_metadata?.user_type || profile.user_type;
    
    if (userType === 'patient') {
      const { error } = await supabase
        .from('patients')
        .insert({
          profile_id: profile.id,
          id_number: user.user_metadata?.id_number || 'DEV123456',
          medical_aid: user.user_metadata?.medical_aid || 'Development Insurance',
        });

      if (error) {
        console.error('Error creating patient record:', error);
        toast.error('Failed to create patient record: ' + error.message);
      } else {
        toast.success('Patient registration completed successfully!');
      }
    } else if (userType === 'doctor') {
      const { error } = await supabase
        .from('doctors')
        .insert({
          profile_id: profile.id,
          license_number: user.user_metadata?.license_number || 'DEV123456',
          practice_name: user.user_metadata?.practice_name || 'Development Practice',
          specialty_category: user.user_metadata?.specialty_category || 'general',
        });

      if (error) {
        console.error('Error creating doctor record:', error);
        toast.error('Failed to create doctor record: ' + error.message);
      } else {
        toast.success('Doctor registration completed successfully!');
      }
    }

    console.log('=== REGISTRATION BYPASS COMPLETED ===');
    
  } catch (error) {
    console.error('Registration bypass error:', error);
    toast.error('Failed to complete registration: ' + error.message);
  }
};
