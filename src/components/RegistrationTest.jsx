import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const RegistrationTest = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleTestRegistration = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: formData.fullName });

      const profileData = {
        user_type: formData.userType,
        full_name: formData.fullName,
      };

      if (formData.userType === 'doctor') {
        profileData.license_number = formData.licenseNumber;
        profileData.practice_name = formData.practiceName;
        profileData.specialty = formData.specialty;
      } else {
        profileData.id_number = formData.idNumber;
        profileData.medical_aid = formData.medicalAid;
        profileData.blood_type = formData.bloodType;
        profileData.emergency_contact = formData.emergencyContact;
        profileData.emergency_phone = formData.emergencyPhone;
      }

      await setDoc(doc(db, 'profiles', user.uid), profileData);

      toast.success('Registration successful!');

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
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  if (process.env.NODE_ENV !== 'development') return null;

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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="test@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="password123"
          />
        </div>

        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="userType">User Type</Label>
          <Select value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
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
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                placeholder="123456789"
              />
            </div>
            <div>
              <Label htmlFor="medicalAid">Medical Aid</Label>
              <Input
                id="medicalAid"
                value={formData.medicalAid}
                onChange={(e) => setFormData({ ...formData, medicalAid: e.target.value })}
                placeholder="HealthPlus Insurance"
              />
            </div>
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Input
                id="bloodType"
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                placeholder="A+"
              />
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              <Input
                id="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                placeholder="MD123456"
              />
            </div>
            <div>
              <Label htmlFor="practiceName">Practice Name</Label>
              <Input
                id="practiceName"
                value={formData.practiceName}
                onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                placeholder="City Medical Center"
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={formData.specialty} onValueChange={(value) => setFormData({ ...formData, specialty: value })}>
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

        <Button onClick={handleTestRegistration} disabled={loading} className="w-full">
          {loading ? 'Registering...' : 'Test Registration'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegistrationTest;
