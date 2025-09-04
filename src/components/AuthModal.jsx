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
import { auth, db } from "@/firebase/firebase"; // ✅ import both auth and db
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ Add Firestore functions

function AuthModal({ isOpen, onClose, userType }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("register");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    idNumber: "",
    medicalAid: "",
    licenseNumber: "",
    practiceName: "",
  });

  const selectedCategory = medicalCategories.find((cat) => cat.id === selectedSpecialty);

  const getCategoryBackground = (categoryId) => {
    switch (categoryId) {
      case "heart":
        return `url(${bgHeart})`;
      case "mind":
        return `url(${bgMind})`;
      default:
        return selectedCategory?.gradient || "bg-gradient-primary";
    }
  };

  const handleAuthAction = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (userType === "doctor" && !selectedSpecialty) {
      toast.error("Please select your medical specialty");
      return;
    }

    setLoading(true);

    try {
      if (mode === "register") {
        // Firebase v9+ registration
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: formData.fullName });
          
          // ✅ CREATE USER PROFILE IN FIRESTORE
          const userProfile = {
            uid: userCredential.user.uid,
            email: formData.email,
            fullName: formData.fullName,
            user_type: userType, // ✅ This is the key part!
            createdAt: new Date().toISOString(),
          };

          // Add user type specific fields
          if (userType === "doctor") {
            userProfile.specialty = selectedSpecialty;
            userProfile.licenseNumber = formData.licenseNumber;
            userProfile.practiceName = formData.practiceName;
          } else {
            userProfile.idNumber = formData.idNumber;
            userProfile.medicalAid = formData.medicalAid;
          }

          // Save to Firestore - match the collection name your hook expects
          await setDoc(doc(db, "profiles", userCredential.user.uid), userProfile);
          
          console.log("User profile created:", userProfile); // Debug log
        }
        
        toast.success("Account created successfully!");
        onClose();
        // ✅ Force a page refresh to ensure profile is loaded
        window.location.href = "/dashboard";
      } else {
        // Firebase v9+ login
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        toast.success("Signed in successfully!");
        onClose();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Auth error:", error); // Debug log
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
            {userType === "doctor" ? <Stethoscope className="w-5 h-5" /> : <Users className="w-5 h-5" />}
            {mode === "login" ? "Sign In" : "Create Account"} as {userType === "doctor" ? "Doctor" : "Patient"}
          </DialogTitle>
        </DialogHeader>

        {/* Doctor specialty card */}
        {userType === "doctor" && selectedSpecialty && (
          <Card
            className="p-4 mb-4 text-white relative overflow-hidden"
            style={{
              background:
                selectedCategory?.id === "heart" || selectedCategory?.id === "mind"
                  ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), ${getCategoryBackground(selectedCategory.id)}`
                  : selectedCategory?.gradient,
            }}
          >
            <div className="relative z-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSpecialty("")}
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

        {/* Form fields */}
        <div className="space-y-4">
          {userType === "doctor" && !selectedSpecialty && (
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

          {(userType === "patient" || selectedSpecialty) && (
            <>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {mode === "register" && (
                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  {/* Additional fields for registration */}
                  {userType === "doctor" && (
                    <>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="license">License Number</Label>
                        <Input
                          id="license"
                          placeholder="Enter your medical license number"
                          value={formData.licenseNumber}
                          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="practice">Practice Name</Label>
                        <Input
                          id="practice"
                          placeholder="Enter your practice name"
                          value={formData.practiceName}
                          onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {userType === "patient" && (
                    <>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="idNumber">ID Number</Label>
                        <Input
                          id="idNumber"
                          placeholder="Enter your ID number"
                          value={formData.idNumber}
                          onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="medicalAid">Medical Aid (Optional)</Label>
                        <Input
                          id="medicalAid"
                          placeholder="Enter your medical aid"
                          value={formData.medicalAid}
                          onChange={(e) => setFormData({ ...formData, medicalAid: e.target.value })}
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
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                >
                  {mode === "login"
                    ? "Don't have an account? Register"
                    : "Already have an account? Sign In"}
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