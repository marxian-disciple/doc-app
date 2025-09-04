import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Star, User, Stethoscope, Heart, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import generalCareImage from "../assets/general-care.jpg";

const GeneralPrimaryCare = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-general text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">General & Primary Care</h1>
              <p className="text-xl mb-8 text-white/90">
                Comprehensive primary healthcare services for all ages. From routine check-ups 
                to preventive care, our experienced general practitioners provide personalized 
                medical attention for your everyday health needs.
              </p>
              <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Book Appointment
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={generalCareImage} 
                alt="General Practice Medicine"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Primary Care Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Stethoscope className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Routine Check-ups</h3>
              <p className="text-muted-foreground">
                Comprehensive physical examinations, health screenings, and preventive care 
                to maintain your overall wellness.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Heart className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Chronic Disease Management</h3>
              <p className="text-muted-foreground">
                Ongoing care for diabetes, hypertension, heart disease, and other 
                chronic conditions with personalized treatment plans.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Activity className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Health Monitoring</h3>
              <p className="text-muted-foreground">
                Regular health assessments, lab work interpretation, and monitoring 
                of vital signs and health metrics.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <User className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Family Medicine</h3>
              <p className="text-muted-foreground">
                Healthcare for the entire family, from pediatric care to geriatric 
                medicine, with age-appropriate treatments.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Urgent Care</h3>
              <p className="text-muted-foreground">
                Same-day appointments for acute illnesses, minor injuries, and 
                urgent medical concerns that can't wait.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Phone className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Telemedicine</h3>
              <p className="text-muted-foreground">
                Virtual consultations for follow-ups, medication reviews, and 
                minor health concerns from the comfort of your home.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our General Practitioners</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-general rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
              <p className="text-muted-foreground mb-3">Family Medicine</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (127 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                15+ years experience in family medicine and preventive care
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-general rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Michael Chen</h3>
              <p className="text-muted-foreground mb-3">Internal Medicine</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (98 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specialist in chronic disease management and adult medicine
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-general rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Emily Rodriguez</h3>
              <p className="text-muted-foreground mb-3">General Practice</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (156 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive care with focus on preventive medicine
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-general text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Healthcare Journey?</h2>
          <p className="text-xl mb-8 text-white/90">
            Schedule your appointment today and take the first step towards better health
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Appointment
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-green-600">
              <Phone className="mr-2" />
              Call Now: (555) 123-4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralPrimaryCare;