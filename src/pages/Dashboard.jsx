import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import PatientDashboard from '../components/PatientDashboard';
import DoctorDashboard from '../components/DoctorDashboard';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  // Debug logging
  console.log('Dashboard Debug:', { user: user?.email, profile: profile?.user_type, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate dashboard based on user type
  if (profile?.user_type === 'doctor') {
    console.log('Routing to Doctor Dashboard');
    return <DoctorDashboard />;
  } else {
    console.log('Routing to Patient Dashboard');
    return <PatientDashboard />;
  }
};

export default Dashboard;