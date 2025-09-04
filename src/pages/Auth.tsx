import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Stethoscope, Users } from "lucide-react";
import AuthModal from "../components/AuthModal";

const Auth = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'patient' | 'doctor' | null>(null);

  const handleUserTypeSelect = (type: 'patient' | 'doctor') => {
    setSelectedUserType(type);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to DocsVisita</h1>
          <p className="text-xl text-white/90">Choose how you'd like to access our platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">I'm a Patient</CardTitle>
              <CardDescription className="text-base">
                Book appointments, manage your health records, and connect with healthcare providers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => handleUserTypeSelect('patient')}
              >
                Continue as Patient
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">I'm a Doctor</CardTitle>
              <CardDescription className="text-base">
                Manage your practice, schedule appointments, and provide quality care to patients
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => handleUserTypeSelect('doctor')}
              >
                Continue as Doctor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        userType={selectedUserType}
      />
    </div>
  );
};

export default Auth;