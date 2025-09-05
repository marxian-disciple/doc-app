// This is where the doctor will be able to manage their patients' information and view their medical records.
// Patients will not have access to this page.
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePatients } from '../hooks/usePatients';

const Patients = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const {
    patients,
    loading: patientsLoading,
    error,
  } = usePatients();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (authLoading || patientsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;
  if (profile?.user_type !== 'doctor') return <Navigate to="/dashboard" replace />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Patients</h1>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          <User className="mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {patients.length ===  0 ? (
        <p className="text-center text-gray-500">No patients found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {patient.name}
                </CardTitle>
                <CardDescription>
                  {patient.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/patient_medical_records?patientId=${patient.id}`)}
                >
                  View Medical Records
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Patients;