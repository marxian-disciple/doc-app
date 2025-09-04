import { useAuth } from '../hooks/useAuth';
import { useDoctors } from '../hooks/useDoctors';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, MapPin, Clock, Star, ArrowLeft, Calendar, AlertCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const Doctors = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { doctors, loading: doctorsLoading, error, refetch, getSpecialties } = useDoctors();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [specialties, setSpecialties] = useState<string[]>(['All']);

  // Load specialties on component mount
  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const specialtyList = await getSpecialties();
        setSpecialties(specialtyList);
      } catch (error) {
        console.error('Error loading specialties:', error);
      }
    };
    loadSpecialties();
  }, [getSpecialties]);

  // Filter doctors based on search and specialty
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch({
        specialty: specialtyFilter,
        search: searchTerm
      });
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchTerm, specialtyFilter, refetch]);

  if (authLoading || doctorsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isDoctor = profile?.user_type === 'doctor';

  const handleBookAppointment = (doctorId: string) => {
    // Navigate to appointment booking page or open modal
    toast.info('Appointment booking feature coming soon!');
    // You can implement appointment booking logic here
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
              <h1 className="text-2xl font-bold text-primary">
                {isDoctor ? 'Patient Management' : 'Find a Doctor'}
              </h1>
              <p className="text-muted-foreground">
                {isDoctor ? 'Search and manage your patients' : 'Book appointments with specialists'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isDoctor && (
              <Button className="w-full md:w-auto">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error loading doctors</span>
              </div>
              <p className="text-red-600 mt-2">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                className="mt-3"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {doctor.full_name?.charAt(0) || 'D'}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doctor.full_name || 'Dr. Unknown'}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {doctor.specialty_category}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {doctor.experience_years && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{doctor.experience_years} years experience</span>
                    </div>
                  )}
                  {doctor.address && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{doctor.address}</span>
                    </div>
                  )}
                  {doctor.working_hours_start && doctor.working_hours_end && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{doctor.working_hours_start} - {doctor.working_hours_end}</span>
                    </div>
                  )}
                  {doctor.consultation_fee && (
                    <div className="pt-2 border-t">
                      <span className="text-lg font-semibold text-primary">
                        ${doctor.consultation_fee}
                      </span>
                      <span className="text-sm text-muted-foreground"> per consultation</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  {isDoctor ? (
                    <Button variant="outline" className="w-full">
                      View Patient List
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="flex-1">
                        View Profile
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => handleBookAppointment(doctor.id)}
                      >
                        Book Appointment
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {doctors.length === 0 && !error && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or specialty filter.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSpecialtyFilter('All'); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Doctors;
