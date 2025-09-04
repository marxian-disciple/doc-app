import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Heart, Activity, Zap, Shield, TrendingUp, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import cardiologyImage from "../assets/cardiology.jpg";

const HeartCirculatory = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-heart text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Heart & Circulatory System</h1>
              <p className="text-xl mb-8 text-white/90">
                Comprehensive cardiovascular care from prevention to advanced treatment. 
                Our board-certified cardiologists provide expert care for heart conditions, 
                circulation issues, and cardiovascular health optimization.
              </p>
              <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Book Cardiology Consultation
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={cardiologyImage} 
                alt="Cardiology and Heart Care"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Cardiovascular Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Heart className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Heart Disease Treatment</h3>
              <p className="text-muted-foreground">
                Comprehensive treatment for coronary artery disease, heart failure, 
                arrhythmias, and other cardiac conditions with cutting-edge therapies.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Activity className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cardiac Diagnostics</h3>
              <p className="text-muted-foreground">
                Advanced diagnostic testing including EKG, echocardiograms, stress tests, 
                and cardiac catheterization for accurate diagnosis.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Zap className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Arrhythmia Management</h3>
              <p className="text-muted-foreground">
                Specialized care for irregular heartbeats, atrial fibrillation, 
                and other rhythm disorders with advanced monitoring and treatment.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Shield className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Preventive Cardiology</h3>
              <p className="text-muted-foreground">
                Risk assessment, lifestyle counseling, and preventive strategies 
                to maintain heart health and prevent cardiovascular disease.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <TrendingUp className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hypertension Care</h3>
              <p className="text-muted-foreground">
                Blood pressure management, medication optimization, and lifestyle 
                modifications for effective hypertension control.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Heart className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cardiac Rehabilitation</h3>
              <p className="text-muted-foreground">
                Post-cardiac event recovery programs with supervised exercise, 
                education, and lifestyle modification support.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Cardiologists Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Cardiovascular Specialists</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-heart rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Robert Anderson</h3>
              <p className="text-muted-foreground mb-3">Interventional Cardiologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (143 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specializes in cardiac catheterization and coronary interventions
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-heart rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Maria Gonzalez</h3>
              <p className="text-muted-foreground mb-3">Electrophysiologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (97 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expert in arrhythmia treatment and pacemaker implantation
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-heart rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. David Kim</h3>
              <p className="text-muted-foreground mb-3">Preventive Cardiologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (134 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Focus on cardiovascular disease prevention and risk management
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-heart text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Protect Your Heart Health Today</h2>
          <p className="text-xl mb-8 text-white/90">
            Early detection and treatment can save lives. Schedule your cardiac evaluation now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Heart Check-up
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-red-600">
              <Zap className="mr-2" />
              Emergency: (555) 911-HEART
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeartCirculatory;