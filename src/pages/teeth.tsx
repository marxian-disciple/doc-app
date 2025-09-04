import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Smile, Droplets, Heart, User, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import teethImage from "../assets/teeth.jpg"; 

const TeethAndMouth = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-16">
        <div className="container mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center mb-6 text-black hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="mr-2 text-black" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on the left */}
            <div className="relative order-1 lg:order-none">
              <img 
                src={teethImage} 
                alt="Teeth and Mouth"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>

            {/* Text on the right */}
            <div>
              <h1 className="text-5xl font-bold mb-6">Teeth & Mouth</h1>
              <p className="text-xl mb-8 text-black/90">
                Comprehensive dental and oral care for healthy teeth, gums, and overall mouth hygiene. 
                Our specialists provide preventive, restorative, and cosmetic treatments to keep your smile bright.
              </p>
              <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Book Consultation
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Dental & Oral Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Smile className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Preventive Care</h3>
              <p className="text-muted-foreground">
                Routine check-ups, cleanings, fluoride treatments, and advice for maintaining oral health.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Zap className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Restorative Dentistry</h3>
              <p className="text-muted-foreground">
                Fillings, crowns, bridges, and root canal treatments to restore damaged teeth.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Droplets className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cosmetic Dentistry</h3>
              <p className="text-muted-foreground">
                Teeth whitening, veneers, bonding, and smile makeovers to enhance your appearance.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Heart className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Oral Health & Wellness</h3>
              <p className="text-muted-foreground">
                Education, nutrition advice, and treatments for gum disease and other oral health concerns.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Specialists</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-skin rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Emily Carter</h3>
              <p className="text-muted-foreground mb-3">Dentist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (250 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expert in preventive care, fillings, and restorative treatments.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-skin rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Michael Hughes</h3>
              <p className="text-muted-foreground mb-3">Orthodontist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (180 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specialist in braces, aligners, and correcting teeth alignment.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-skin rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sophia Lin</h3>
              <p className="text-muted-foreground mb-3">Cosmetic Dentist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (210 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Focused on teeth whitening, veneers, and smile makeovers.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-skin text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Healthy Teeth, Confident Smile</h2>
          <p className="text-xl mb-8 text-white/90">
            Our dental and oral health specialists are here to help you maintain a bright, healthy smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Appointment
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-orange-600">
              <Zap className="mr-2" />
              Dental Hotline: (555) 123-TEETH
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeethAndMouth;
