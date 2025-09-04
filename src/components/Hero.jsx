import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Heart, Brain, Stethoscope, Calendar, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-medical.jpg";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-lighter to-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              DocsVisita
              <span className="block text-3xl lg:text-4xl text-muted-foreground font-medium mt-2">
                Digital Healthcare Platform
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connecting patients with healthcare professionals through a secure, 
              modern platform. Book appointments, manage medical records, and 
              receive quality care digitally.
            </p>
          </div>
          
          {/* Right Column - Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-heart text-white hover:scale-105 transition-all duration-300 shadow-card hover:shadow-medical">
              <Heart className="w-12 h-12 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Heart & Circulatory</h3>
              <p className="text-sm opacity-90">Specialized cardiac care and consultation</p>
            </Card>
            
            <Card className="p-6 bg-gradient-mind text-white hover:scale-105 transition-all duration-300 shadow-card hover:shadow-medical">
              <Brain className="w-12 h-12 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Mind & Behavior</h3>
              <p className="text-sm opacity-90">Mental health and psychological support</p>
            </Card>
            
            <Card className="p-6 bg-gradient-general text-white hover:scale-105 transition-all duration-300 shadow-card hover:shadow-medical">
              <Calendar className="w-12 h-12 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
              <p className="text-sm opacity-90">Schedule appointments with preferred doctors</p>
            </Card>
            
            <Card className="p-6 bg-gradient-primary text-white hover:scale-105 transition-all duration-300 shadow-card hover:shadow-medical">
              <Shield className="w-12 h-12 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm opacity-90">End-to-end encrypted medical data</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;