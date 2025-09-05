import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';

const DoctorAppointments = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const {
    appointments,
    loading: appointmentsLoading,
    error,
    cancelAppointment,
    confirmAppointment,
  } = useAppointments();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (authLoading || appointmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;
  if (profile?.user_type !== 'doctor') return <Navigate to="/appointments" replace />;

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      toast.success('Appointment cancelled successfully');
    } catch {
      toast.error('Failed to cancel appointment');
    }
  };

  const handleConfirm = async (id) => {
    try {
      await confirmAppointment(id);
      toast.success('Appointment confirmed successfully');
    } catch {
      toast.error('Failed to confirm appointment');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Appointment Requests</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {appointments.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No appointment requests at the moment.
          </p>
        ) : (
          <div className="grid gap-6">
            {appointments.map((apt) => (
              <div key={apt.id} className="border rounded-lg p-4 shadow-sm bg-white">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{apt.patientName || 'Patient Name'}</h2>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Date:</strong> {apt.date}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Time:</strong> {apt.time}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  <strong>Reason:</strong> {apt.reason || 'N/A'}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  <strong>Contact:</strong> {apt.patientEmail || 'N/A'}
                </p>

                {apt.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleConfirm(apt.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorAppointments;
