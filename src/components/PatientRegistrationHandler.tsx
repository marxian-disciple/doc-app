import { useEffect } from 'react';
import { toast } from 'sonner';

export const usePatientRegistrationHandler = () => {
  useEffect(() => {
    const handleAuthStateChange = async (event: string, session: Session | null) => {
      if (event === 'SIGNED_UP' && session?.user) {
        const user = session.user;
        const metadata = user.user_metadata;

        try {
          // Wait a bit for the profile to be created by the trigger
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Get the created profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, user_type')
            .eq('user_id', user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            toast.error('Failed to complete registration - profile not found');
            return;
          }

          if (profile) {
            if (metadata.user_type === 'patient' && profile.user_type === 'patient') {
              // Create patient record
              const { error } = await supabase
                .from('patients')
                .insert({
                  profile_id: profile.id,
                  id_number: metadata.id_number || '',
                  medical_aid: metadata.medical_aid || '',
                });

              if (error) {
                console.error('Error creating patient record:', error);
                toast.error('Failed to complete patient registration');
              } else {
                console.log('Patient record created successfully');
              }
            } else if (metadata.user_type === 'doctor' && profile.user_type === 'doctor') {
              // Create doctor record
              const { error } = await supabase
                .from('doctors')
                .insert({
                  profile_id: profile.id,
                  license_number: metadata.license_number || '',
                  practice_name: metadata.practice_name || '',
                  specialty_category: metadata.specialty_category || '',
                });

              if (error) {
                console.error('Error creating doctor record:', error);
                toast.error('Failed to complete doctor registration');
              } else {
                console.log('Doctor record created successfully');
              }
            }
          }
        } catch (error) {
          console.error('Registration completion error:', error);
          toast.error('Failed to complete registration');
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => subscription.unsubscribe();
  }, []);
};