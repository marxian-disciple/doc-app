import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Stethoscope, Calendar, FileText, Shield, MapPin } from "lucide-react";

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: 'patient' | 'doctor') => void;
}

const UserTypeSelection = ({ onUserTypeSelect }: UserTypeSelectionProps) => {
  return (
    <div className="py-16 bg-gradient-to-b from-primary-lighter/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Join DocsVisita
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose how you'd like to use our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Patient Card */}
          <Card className="p-8 hover:scale-105 transition-all duration-300 shadow-card hover:shadow-medical">
            <div className="text-center mb-6">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Patient</h3>
              <p className="text-muted-foreground">
                Book appointments and manage your healthcare journey
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm">Schedule appointments with specialists</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm">Access your medical records securely</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Find nearby healthcare providers</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Encrypted data protection</span>
              </div>
            </div>
            
            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started as Patient
            </Button>
          </Card>
          
          {/* Doctor Card */}
          <Card className="p-8 hover:scale-105 transition-all duration-300 shadow-card hover:shadow-medical border-primary/20">
            <div className="text-center mb-6">
              <Stethoscope className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Doctor</h3>
              <p className="text-muted-foreground">
                Manage your practice and provide digital healthcare
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm">Manage appointment schedules</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm">Digital patient records system</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">Search and manage patients</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">HIPAA-compliant data handling</span>
              </div>
            </div>
            
            <Button 
              variant="medical" 
              className="w-full"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started as Doctor
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;