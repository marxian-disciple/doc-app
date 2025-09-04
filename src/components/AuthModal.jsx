import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Stethoscope, Users, ArrowLeft } from "lucide-react";
import { medicalCategories } from "./MedicalCategories";
import bgHeart from "@/assets/bg-heart.jpg";
import bgMind from "@/assets/bg-mind.jpg";
import { toast } from "sonner";
import { app } from "@/firebase/firebase";

// Use Firebase CDN via window.firebase if available, otherwise fallback to app import
const firebaseAuth =
  window.firebase && window.firebase.auth
    ? window.firebase.auth()
    : app.auth();

function AuthModal({ isOpen, onClose, userType }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('register');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    idNumber: '',
    medicalAid: '',
    licenseNumber: '',
    practiceName: '',
  });

  const selectedCategory = medicalCategories.find(cat => cat.id === selectedSpecialty);

  const getCategoryBackground = (categoryId) => {
    switch (categoryId) {
      case 'heart':
        return `url(${bgHeart})`;
      case 'mind':
        return `url(${bgMind})`;
      default:
        return selectedCategory?.gradient || 'bg-gradient-primary';
    }
  };

  const handleAuthAction = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (userType === 'doctor' && !selectedSpecialty) {
      toast.error("Please select your medical specialty");
      return;
    }

    setLoading(true);

    try {
      if (mode === 'register') {
        // Register with Firebase
        await firebaseAuth.createUserWithEmailAndPassword(formData.email, formData.password);
        // Optionally update profile
        const user = firebaseAuth.currentUser;
        await user.updateProfile({
          displayName: formData.fullName,
        });
        toast.success("Account created successfully! Please check your email to confirm your account.");
        onClose();
      } else {
        // Login with Firebase
        await firebaseAuth.signInWithEmailAndPassword(formData.email, formData.password);
        toast.success("Signed in successfully!");
        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {userType === 'doctor' ? <Stethoscope className="w-5 h-5" /> : <Users className="w-5 h-5" />}
            {mode === 'login' ? 'Sign In' : 'Create Account'} as {userType === 'doctor' ? 'Doctor' : 'Patient'}
          </DialogTitle>
        </DialogHeader>
        
        {userType === 'doctor' && selectedSpecialty && (
          <Card 
            className="p-4 mb-4 text-white relative overflow-hidden"
            style={{
              background: selectedCategory?.id === 'heart' || selectedCategory?.id === 'mind' 
                ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), ${getCategoryBackground(selectedCategory.id)}`
                : selectedCategory?.gradient
            }}
          >
            <div className="relative z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSpecialty('')}
                className="text-white hover:bg-white/20 mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Change Specialty
              </Button>
              <h3 className="font-semibold">{selectedCategory?.name}</h3>
              <p className="text-sm opacity-90">Selected medical specialty</p>
            </div>
          </Card>
        )}
        
        <div className="space-y-4">
          {userType === 'doctor' && !selectedSpecialty && (
            <div>
              <Label htmlFor="specialty">Medical Specialty</Label>
              <Select onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your medical specialty" />
                </SelectTrigger>
                <SelectContent>
                  {medicalCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {(userType === 'patient' || selectedSpecialty) && (
            <>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              
              {mode === 'register' && (
                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  
                  {userType === 'patient' && (
                    <>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="id-number">ID Number</Label>
                        <Input 
                          id="id-number" 
                          placeholder="Enter your ID number"
                          value={formData.idNumber}
                          onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="medical-aid">Medical Aid</Label>
                        <Input 
                          id="medical-aid" 
                          placeholder="Enter your medical aid details"
                          value={formData.medicalAid}
                          onChange={(e) => setFormData({...formData, medicalAid: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                  
                  {userType === 'doctor' && (
                    <>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="license">License Number</Label>
                        <Input 
                          id="license" 
                          placeholder="Enter your medical license number"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="practice">Practice Name</Label>
                        <Input 
                          id="practice" 
                          placeholder="Enter your practice name"
                          value={formData.practiceName}
                          onChange={(e) => setFormData({...formData, practiceName: e.target.value})}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              
              <Button 
                variant="medical" 
                className="w-full mt-6"
                onClick={handleAuthAction}
                disabled={loading}
              >
                {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </Button>
              
              <div className="text-center">
                <Button 
                  variant="link" 
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                >
                  {mode === 'login' 
                    ? "Don't have an account? Register" 
                    : "Already have an account? Sign In"
                  }
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
