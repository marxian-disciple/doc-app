import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Brain, Heart, Users, Shield, MessageCircle, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import mentalHealthImage from "@/assets/mental-health.jpg";

const MindBehavior = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-mind text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center mb-6 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Mind & Behavior</h1>
              <p className="text-xl mb-8 text-white/90">
                Comprehensive mental health care and psychological support. Our experienced 
                therapists and psychiatrists provide personalized treatment for anxiety, 
                depression, stress management, and behavioral health concerns.
              </p>
              <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Schedule Consultation
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={mentalHealthImage} 
                alt="Mental Health Therapy"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Mental Health Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Brain className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Psychotherapy</h3>
              <p className="text-muted-foreground">
                Individual and group therapy sessions using evidence-based approaches 
                like CBT, DBT, and mindfulness-based interventions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Heart className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Anxiety & Depression</h3>
              <p className="text-muted-foreground">
                Specialized treatment for mood disorders, anxiety disorders, and 
                depression with personalized care plans and coping strategies.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Family Therapy</h3>
              <p className="text-muted-foreground">
                Relationship counseling, family dynamics, and couples therapy 
                to strengthen bonds and improve communication.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trauma & PTSD</h3>
              <p className="text-muted-foreground">
                Specialized treatment for trauma, PTSD, and stress-related disorders 
                using trauma-informed care approaches.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <MessageCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Behavioral Therapy</h3>
              <p className="text-muted-foreground">
                Treatment for behavioral issues, addiction recovery, and habit 
                modification through evidence-based behavioral interventions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Brain className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Psychiatric Care</h3>
              <p className="text-muted-foreground">
                Medication management, psychiatric evaluations, and comprehensive 
                mental health assessments by licensed psychiatrists.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mental Health Professionals</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-mind rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Lisa Martinez</h3>
              <p className="text-muted-foreground mb-3">Clinical Psychologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (89 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specializes in CBT, anxiety disorders, and trauma therapy
              </p>
              <Button variant="outline" size="sm">Book Session</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-mind rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. James Wilson</h3>
              <p className="text-muted-foreground mb-3">Psychiatrist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 (112 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Medication management and severe mental health conditions
              </p>
              <Button variant="outline" size="sm">Book Session</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-mind rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Amanda Foster</h3>
              <p className="text-muted-foreground mb-3">Family Therapist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.9 (67 reviews)</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Couples counseling and family relationship therapy
              </p>
              <Button variant="outline" size="sm">Book Session</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-mind text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Take the First Step Towards Better Mental Health</h2>
          <p className="text-xl mb-8 text-white/90">
            Your mental health matters. Connect with our compassionate professionals today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Session
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-purple-600">
              <MessageCircle className="mr-2" />
              Crisis Support: (555) 987-6543
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MindBehavior;