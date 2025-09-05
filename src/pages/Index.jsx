import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import MedicalCategories from "../components/MedicalCategories";
import UserTypeSelection from "../components/UserTypeSelection";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../hooks/useAuth";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null); // no TS union types
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Debug logging
  console.log('Index component rendering:', { user, loading });

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <MedicalCategories />
      <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        userType={selectedUserType}
      />
    </div>
  );
};

export default Index;
