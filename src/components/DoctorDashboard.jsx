import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, FileText, LogOut, Stethoscope, Heart, Brain, Activity, Eye, Baby, Bone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bgHeart from '@/assets/bg-heart.jpg';
import bgMind from '@/assets/bg-mind.jpg';

const DoctorDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  // Get specialty background and icon
  const getSpecialtyConfig = (specialty) => {
    switch (specialty) {
      case 'heart':
        return {
          background: `url(${bgHeart})`,
          icon: Heart,
          title: 'Heart & Circulatory Specialist'
        };
      case 'mind':
        return {
          background: `url(${bgMind})`,
          icon: Brain,
          title: 'Mind & Behavior Specialist'
        };
      case 'bones':
        return {
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          icon: Bone,
          title: 'Orthopedic Specialist'
        };
      case 'reproductive':
        return {
          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
          icon: Baby,
          title: 'Reproductive Health Specialist'
        };
      case 'respiratory':
        return {
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          icon: Activity,
          title: 'Respiratory Specialist'
        };
      case 'ophthalmology':
        return {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          icon: Eye,
          title: 'Ophthalmology Specialist'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          icon: Stethoscope,
          title: 'General Practice Specialist'
        };
    }
  };

  const specialty = profile?.doctors?.[0]?.specialty_category || 'general';
  const specialtyConfig = getSpecialtyConfig(specialty);
  const SpecialtyIcon = specialtyConfig.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with specialty background */}
      <header 
        className="relative border-b text-white"
        style={{
          background: specialtyConfig.background,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">DocsVisita</h1>
              <p className="text-lg opacity-90">
                Welcome back, Dr. {profile?.full_name || user.email}
              </p>
              <p className="text-sm opacity-75 capitalize">
                {specialtyConfig.title}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm opacity-90">
                <SpecialtyIcon className="w-4 h-4" />
                <span>Doctor Portal</span>
              </div>
              <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Doctor-specific dashboard cards */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Practice Dashboard</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Manage your practice, appointments, and patient care efficiently. Digitalize your medical filing system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/doctor_appointments')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Appointments
              </CardTitle>
              <CardDescription>
                View and manage your upcoming patient appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Calendar</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/medical-records')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Patient Medical Records
              </CardTitle>
              <CardDescription>
                Access and update patient medical files digitally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Records</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => navigate('/doctors')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Patient Directory
              </CardTitle>
              <CardDescription>
                Search and manage your patient database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">View Patients</Button>
            </CardContent>
          </Card>
        </div>

        {/* Practice Information Card */}
        {profile?.doctors?.[0] && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SpecialtyIcon className="w-5 h-5" />
                  Practice Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold">Specialty</h4>
                    <p className="text-muted-foreground capitalize">{profile.doctors[0].specialty_category}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">License Number</h4>
                    <p className="text-muted-foreground">{profile.doctors[0].license_number}</p>
                  </div>
                  {profile.doctors[0].practice_name && (
                    <div>
                      <h4 className="font-semibold">Practice Name</h4>
                      <p className="text-muted-foreground">{profile.doctors[0].practice_name}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">Working Hours</h4>
                    <p className="text-muted-foreground">
                      {profile.doctors[0].working_hours_start} - {profile.doctors[0].working_hours_end}
                    </p>
                  </div>
                  {profile.doctors[0].consultation_fee && (
                    <div>
                      <h4 className="font-semibold">Consultation Fee</h4>
                      <p className="text-muted-foreground">R{profile.doctors[0].consultation_fee}</p>
                    </div>
                  )}
                  {profile.doctors[0].address && (
                    <div>
                      <h4 className="font-semibold">Address</h4>
                      <p className="text-muted-foreground">{profile.doctors[0].address}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;
