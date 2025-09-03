import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Bone, Dumbbell, Zap, Shield, Activity, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import orthopedicsImage from "@/assets/orthopedics.jpg";

const BonesMusclesMovement = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-bones text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Bones, Muscles & Movement</h1>
              <p className="text-xl mb-8 text-white/90">
                Comprehensive orthopedic and musculoskeletal care for injuries, chronic 
                conditions, and movement disorders. Our specialists help restore function 
                and mobility through advanced treatments and rehabilitation.
              </p>
              <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Book Orthopedic Consultation
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={orthopedicsImage} 
                alt="Orthopedics and Musculoskeletal Care"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Orthopedic & Musculoskeletal Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Bone className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Bone & Joint Care</h3>
              <p className="text-muted-foreground">
                Treatment for fractures, arthritis, joint pain, and bone disorders 
                with both surgical and non-surgical approaches.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Dumbbell className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Sports Medicine</h3>
              <p className="text-muted-foreground">
                Specialized care for sports injuries, performance optimization, 
                and return-to-sport rehabilitation for athletes of all levels.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Zap className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Pain Management</h3>
              <p className="text-muted-foreground">
                Comprehensive pain management for chronic musculoskeletal conditions 
                using injections, therapy, and minimally invasive procedures.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Shield className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Orthopedic Surgery</h3>
              <p className="text-muted-foreground">
                Advanced surgical procedures including joint replacement, 
                arthroscopy, and trauma surgery with minimally invasive techniques.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Activity className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Physical Therapy</h3>
              <p className="text-muted-foreground">
                Rehabilitation services to restore movement, strength, and function 
                after injury or surgery with personalized treatment plans.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Bone className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Spine Care</h3>
              <p className="text-muted-foreground">
                Comprehensive spine treatment for back pain, disc problems, 
                and spinal deformities with both conservative and surgical options.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Orthopedic Specialists</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-bones rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Thomas Wright</h3>
              <p className="text-muted-foreground mb-3">Orthopedic Surgeon</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (156 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Joint replacement specialist with 20+ years experience
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-bones rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Jennifer Lee</h3>
              <p className="text-muted-foreground mb-3">Sports Medicine Physician</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (92 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expert in sports injuries and performance medicine
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-bones rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Mark Thompson</h3>
              <p className="text-muted-foreground mb-3">Spine Specialist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (178 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Minimally invasive spine surgery and back pain treatment
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-bones text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Back to Moving Pain-Free</h2>
          <p className="text-xl mb-8 text-white/90">
            Don't let pain limit your life. Our orthopedic specialists are here to help you move better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Evaluation
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-orange-600">
              <Activity className="mr-2" />
              Urgent Care: (555) 234-BONE
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BonesMusclesMovement;