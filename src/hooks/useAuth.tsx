import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { usePatientRegistrationHandler } from '@/components/PatientRegistrationHandler';

interface Doctor {
  id: string;
  profile_id: string;
  license_number: string;
  practice_name?: string;
  specialty_category: string;
  qualification?: string;
  experience_years?: number;
  consultation_fee?: number;
  address?: string;
  working_hours_start: string;
  working_hours_end: string;
}

interface Patient {
  id: string;
  profile_id: string;
  id_number: string;
  medical_aid?: string;
  address?: string;
  date_of_birth?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  medical_history?: string;
  current_medications?: string;
  allergies?: string;
}

interface Profile {
  id: string;
  user_id: string;
  user_type: 'patient' | 'doctor';
  full_name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  doctors?: Doctor | null;
  patients?: Patient | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle patient/doctor registration completion
  usePatientRegistrationHandler();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange( // change this to firebase
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile with proper error handling
          try {
            const { data: profileData, error: profileError } = await supabase // change this to firebase
              .from('profiles')
              .select(`
                *,
                doctors (*),
                patients (*)
              `)
              .eq('user_id', session.user.id)
              .single();
            
            if (profileError) {
              console.error('Profile fetch error:', profileError);
              setProfile(null);
            } else {
              console.log('Profile loaded:', profileData);
              setProfile(profileData);
            }
          } catch (error) {
            console.error('Profile fetch exception:', error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => { // change this to firebase
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut(); // change this to firebase
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};