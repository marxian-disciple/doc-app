import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, FileText, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import MedicalCategories from '@/components/MedicalCategories';

const PatientDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">DocsVisita</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name || user.email}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Patient Portal</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await signOut(); // signs the user out
                navigate('/');    // optional: redirect to login/home page
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <Hero />
      <MedicalCategories />

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Appointments Card */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/appointments')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                My Appointments
              </CardTitle>
              <CardDescription>View your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/appointments')}>
                View Appointments
              </Button>
            </CardContent>
          </Card>

          {/* Doctors Card */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/doctors')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Find a Doctor
              </CardTitle>
              <CardDescription>Book an appointment with a specialist</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/doctors')}>
                Browse Doctors
              </Button>
            </CardContent>
          </Card>

          {/* Medical Records Card */}
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/medical-records')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                My Medical Records
              </CardTitle>
              <CardDescription>Access your medical history</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => navigate('/medical-records')}>
                View Records
              </Button>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
