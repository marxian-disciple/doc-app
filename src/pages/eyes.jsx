import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Eye, Ear, Mic, HeartPulse, Shield, Activity, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import entImage from "../assets/ent.jpg"; 

const EyesEarsNoseThroat = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
    <header className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-6">
        <Link 
        to="/" 
        className="inline-flex items-center mb-6 text-black hover:text-blue-600 transition-colors"
        >
        <ArrowLeft className="mr-2 text-black" />
        Back to Home
        </Link>
    
            <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <div className="relative order-1 lg:order-none">
                <img 
                src={entImage} 
                alt="ENT Care"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
                />
            </div>

            {/* Text on the right */}
            <div>
                <h1 className="text-5xl font-bold mb-6">Eyes, Ears, Nose & Throat (ENT)</h1>
                <p className="text-xl mb-8 text-black/90">
                Comprehensive care for vision, hearing, sinus, and throat conditions. 
                Our ENT specialists provide advanced diagnostics, treatments, and surgeries 
                to help you see, hear, breathe, and speak clearly.
                </p>
                <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Book ENT Consultation
                </Button>
            </div>
            </div>
        </div>
    </header>


      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">ENT Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Eye className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Eye Care</h3>
              <p className="text-muted-foreground">
                Diagnosis and treatment for vision problems, cataracts, glaucoma, 
                and other eye-related conditions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Ear className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hearing & Balance</h3>
              <p className="text-muted-foreground">
                Specialized treatments for hearing loss, tinnitus, and balance disorders 
                with hearing aid and cochlear implant support.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Mic className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Voice & Throat</h3>
              <p className="text-muted-foreground">
                Care for vocal cord issues, chronic sore throat, swallowing difficulties, 
                and thyroid conditions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <HeartPulse className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sinus & Allergy Care</h3>
              <p className="text-muted-foreground">
                Treatment for chronic sinusitis, nasal congestion, allergies, 
                and breathing difficulties.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">ENT Surgery</h3>
              <p className="text-muted-foreground">
                Advanced surgical procedures including tonsillectomy, adenoidectomy, 
                sinus surgery, and corrective procedures.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Activity className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Pediatric ENT</h3>
              <p className="text-muted-foreground">
                Gentle and specialized ENT care for children with ear infections, 
                tonsil issues, and speech-related conditions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our ENT Specialists</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-ent rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Collins</h3>
              <p className="text-muted-foreground mb-3">ENT Surgeon</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (210 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specialist in sinus and nasal surgery with 15+ years of experience.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-ent rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Michael Harris</h3>
              <p className="text-muted-foreground mb-3">Audiologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (135 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expert in hearing loss management and balance therapy.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-ent rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Emily Carter</h3>
              <p className="text-muted-foreground mb-3">Pediatric ENT</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (178 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Providing compassionate ENT care for children with ear, nose, and throat issues.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-100 text-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Clearer Vision, Better Hearing, Easier Breathing</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Our ENT specialists are here to improve your quality of life with expert care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Appointment
            </Button>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <Activity className="mr-2" />
              Urgent Care: (555) 123-ENTC
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EyesEarsNoseThroat;
