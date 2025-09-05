import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const RegistrationTest = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'patient' as 'patient' | 'doctor',
    idNumber: '',
    medicalAid: '',
    licenseNumber: '',
    practiceName: '',
    specialty: 'general',
    bloodType: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleTestRegistration = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      console.log('Starting test registration...');

      const { data, error } = await supabase.auth.signUp({ // change this to firebase
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_type: formData.userType,
            full_name: formData.fullName,
            specialty_category: formData.userType === 'doctor' ? formData.specialty : undefined,
            license_number: formData.userType === 'doctor' ? formData.licenseNumber : undefined,
            practice_name: formData.userType === 'doctor' ? formData.practiceName : undefined,
            id_number: formData.userType === 'patient' ? formData.idNumber : undefined,
            medical_aid: formData.userType === 'patient' ? formData.medicalAid : undefined,
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        toast.error('Registration failed: ' + error.message);
      } else {
        console.log('Registration successful:', data);
        toast.success('Registration successful! Check console for details.');
        
        // Clear form
        setFormData({
          email: '',
          password: '',
          fullName: '',
          userType: 'patient',
          idNumber: '',
          medicalAid: '',
          licenseNumber: '',
          practiceName: '',
          specialty: 'general',
          bloodType: '',
          emergencyContact: '',
          emergencyPhone: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed top-4 right-4 w-96 z-50">
      <CardHeader>
        <CardTitle className="text-sm">Registration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="password123"
          />
        </div>
        
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <Label htmlFor="userType">User Type</Label>
          <Select value={formData.userType} onValueChange={(value: 'patient' | 'doctor') => setFormData({...formData, userType: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {formData.userType === 'patient' && (
          <>
            <div>
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                placeholder="123456789"
              />
            </div>
            <div>
              <Label htmlFor="medicalAid">Medical Aid</Label>
              <Input
                id="medicalAid"
                value={formData.medicalAid}
                onChange={(e) => setFormData({...formData, medicalAid: e.target.value})}
                placeholder="HealthPlus Insurance"
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Input
                id="bloodType"
                value={formData.bloodType}
                onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                placeholder="A+"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
                placeholder="555-0123"
              />
            </div>
          </>
        )}
        
        {formData.userType === 'doctor' && (
          <>
            <div>
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                placeholder="MD123456"
              />
            </div>
            <div>
              <Label htmlFor="practiceName">Practice Name</Label>
              <Input
                id="practiceName"
                value={formData.practiceName}
                onChange={(e) => setFormData({...formData, practiceName: e.target.value})}
                placeholder="City Medical Center"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={formData.specialty} onValueChange={(value) => setFormData({...formData, specialty: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        <Button 
          onClick={handleTestRegistration} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Registering...' : 'Test Registration'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistrationTest;
