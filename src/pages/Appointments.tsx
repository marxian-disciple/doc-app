import { useAuth } from '../hooks/useAuth';
import { useAppointments } from '../hooks/useAppointments';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar, Clock, User, MapPin, ArrowLeft, AlertCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Appointments = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { appointments, loading: appointmentsLoading, error, cancelAppointment, confirmAppointment } = useAppointments();
  const navigate = useNavigate();

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

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isDoctor = profile?.user_type === 'doctor';

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId);
      toast.success('Appointment cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await confirmAppointment(appointmentId);
      toast.success('Appointment confirmed successfully');
    } catch (error) {
      toast.error('Failed to confirm appointment');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary">Appointments</h1>
              <p className="text-muted-foreground">
                {isDoctor ? 'Manage your appointments' : 'View your appointments'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button className="mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            {isDoctor ? 'Schedule New Appointment' : 'Book Appointment'}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error loading appointments</span>
              </div>
              <p className="text-red-600 mt-2">{error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      {appointment.appointment_date} at {appointment.appointment_time}
                    </CardTitle>
                    <CardDescription>
                      {isDoctor ? `Patient: ${appointment.patient_name || 'Unknown'}` : `Doctor: ${appointment.doctor_name || 'Unknown'}`}
                    </CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {isDoctor ? appointment.patient_name || 'Unknown Patient' : appointment.doctor_name || 'Unknown Doctor'}
                    </span>
                  </div>
                  {appointment.specialty && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.specialty}</span>
                    </div>
                  )}
                  {appointment.reason && (
                    <div className="flex items-center gap-2 md:col-span-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.reason}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    {isDoctor ? 'View Patient Details' : 'View Doctor Details'}
                  </Button>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  {appointment.status === 'pending' && isDoctor && (
                    <Button 
                      size="sm" 
                      onClick={() => handleConfirmAppointment(appointment.id)}
                    >
                      Confirm
                    </Button>
                  )}
                  {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {appointments.length === 0 && !error && (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No appointments yet</h3>
                <p className="text-muted-foreground mb-4">
                  {isDoctor ? 'You don\'t have any scheduled appointments.' : 'You don\'t have any upcoming appointments.'}
                </p>
                <Button onClick={() => navigate('/doctors')}>
                  {isDoctor ? 'Schedule Appointment' : 'Book Your First Appointment'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointments;
