import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { ArrowLeft, Calendar, Sparkles, Scissors, Droplets, Heart, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import skinImage from "../assets/skin.jpg"; 

const SkinHairAppearance = () => {
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
                src={skinImage} 
                alt="Skin, Hair and Appearance"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>

            {/* Text on the right */}
            <div>
              <h1 className="text-5xl font-bold mb-6">Skin, Hair & Appearance</h1>
              <p className="text-xl mb-8 text-black/90">
                Expert dermatology and cosmetic care for healthy skin, 
                vibrant hair, and enhanced appearance. 
                Our specialists provide advanced treatments and personalized care 
                to help you look and feel your best.
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
          <h2 className="text-3xl font-bold text-center mb-12">Skin, Hair & Appearance Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Sparkles className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Skin Treatments</h3>
              <p className="text-muted-foreground">
                Advanced care for acne, eczema, psoriasis, pigmentation, 
                and other skin conditions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Scissors className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hair Care</h3>
              <p className="text-muted-foreground">
                Treatments for hair loss, dandruff, scalp conditions, 
                and cosmetic hair restoration.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Droplets className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cosmetic Dermatology</h3>
              <p className="text-muted-foreground">
                Anti-aging therapies, wrinkle reduction, fillers, and 
                skin rejuvenation procedures.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Heart className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Wellness & Glow</h3>
              <p className="text-muted-foreground">
                Personalized skincare routines and wellness therapies 
                to boost natural glow.
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
              <h3 className="text-xl font-semibold mb-2">Dr. Olivia Bennett</h3>
              <p className="text-muted-foreground mb-3">Dermatologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (220 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specialist in acne, pigmentation, and cosmetic dermatology.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-skin rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Daniel Wright</h3>
              <p className="text-muted-foreground mb-3">Trichologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (160 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expert in hair loss, scalp health, and restoration therapies.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-skin rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sophia Lee</h3>
              <p className="text-muted-foreground mb-3">Cosmetic Specialist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (195 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Focused on non-surgical aesthetic treatments and facial rejuvenation.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with light blue background */}
      <section className="py-16 bg-blue-100 text-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Healthy Skin, Strong Hair, Confident You</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Our dermatology and cosmetic experts are here to help you achieve your best appearance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Appointment
            </Button>
            <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              <Sparkles className="mr-2" />
              Cosmetic Hotline: (555) 987-SKIN
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkinHairAppearance;