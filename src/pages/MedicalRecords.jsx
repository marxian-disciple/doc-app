import { useAuth } from '../hooks/useAuth';
import { useMedicalRecords } from '../hooks/useMedicalRecords';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FileText, Calendar, User, Stethoscope, ArrowLeft, Download, Eye, AlertCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const MedicalRecords = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { records, loading: recordsLoading, error, refetch } = useMedicalRecords();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  if (authLoading || recordsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading medical records...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isDoctor = profile?.user_type === 'doctor';

  const dateFilters = ['All', 'Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year'];

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      (record.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (record.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (record.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    // Date filtering logic
    let matchesDate = true;
    if (dateFilter !== 'All') {
      const recordDate = new Date(record.visit_date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'Last 7 days':
          matchesDate = daysDiff <= 7;
          break;
        case 'Last 30 days':
          matchesDate = daysDiff <= 30;
          break;
        case 'Last 3 months':
          matchesDate = daysDiff <= 90;
          break;
        case 'Last year':
          matchesDate = daysDiff <= 365;
          break;
      }
    }
    
    return matchesSearch && matchesDate;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
                {isDoctor ? 'Patient Medical Records' : 'My Medical Records'}
              </h1>
              <p className="text-muted-foreground">
                {isDoctor ? 'Access and manage patient medical history' : 'View your complete medical history'}
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
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={isDoctor ? "Search patients, diagnoses..." : "Search records..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                {dateFilters.map((filter) => (
                  <SelectItem key={filter} value={filter}>
                    {filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error loading medical records</span>
              </div>
              <p className="text-red-600 mt-2">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refetch}
                className="mt-3"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Records List */}
        <div className="grid gap-6">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      {formatDate(record.visit_date)}
                    </CardTitle>
                    <CardDescription>
                      {isDoctor ? `Patient: ${record.patient_name || 'Unknown'}` : `Doctor: ${record.doctor_name || 'Unknown'}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {record.specialty && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {record.specialty}
                      </span>
                    )}
                    {record.follow_up_required && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        Follow-up Required
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-2">Diagnosis</h4>
                    <p className="text-sm text-muted-foreground mb-3">{record.diagnosis || 'No diagnosis recorded'}</p>
                    
                    <h4 className="font-semibold mb-2">Symptoms</h4>
                    <p className="text-sm text-muted-foreground mb-3">{record.symptoms || 'No symptoms recorded'}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Prescription</h4>
                    <p className="text-sm text-muted-foreground mb-3">{record.prescription || 'No prescription recorded'}</p>
                    
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground mb-3">{record.notes || 'No notes recorded'}</p>
                  </div>
                </div>

                {record.follow_up_required && record.follow_up_date && (
                  <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-800">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Follow-up scheduled for: {formatDate(record.follow_up_date)}</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Record
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {isDoctor && (
                    <Button size="sm">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Schedule Follow-up
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No medical records found</h3>
              <p className="text-muted-foreground mb-4">
                {isDoctor 
                  ? 'No patient records match your search criteria.' 
                  : 'You don\'t have any medical records yet.'
                }
              </p>
              <Button onClick={() => { setSearchTerm(''); setDateFilter(''); }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MedicalRecords;
