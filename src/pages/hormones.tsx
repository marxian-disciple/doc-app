import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Activity, Flame, Droplets, HeartPulse, Shield, User, Star } from "lucide-react";
import { Link } from "react-router-dom";
import hormonesImage from "@/assets/hormones.jpg";

const HormonesMetabolism = () => {
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
                src={hormonesImage}
                alt="Hormones & Metabolism"
                className="rounded-lg shadow-medical w-full h-80 object-cover"
              />
            </div>

            {/* Text on the right */}
            <div>
              <h1 className="text-5xl font-bold mb-6">Hormones & Metabolism</h1>
              <p className="text-xl mb-8 text-black/90">
                Expert care for hormonal balance, thyroid health, and metabolic
                conditions. Our specialists help optimize your energy, weight
                management, and long-term wellness.
              </p>
              <Button variant="secondary" size="lg" className="group">
                <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
                Book Hormone Consultation
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hormones & Metabolism Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Flame className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Thyroid Care</h3>
              <p className="text-muted-foreground">
                Diagnosis and management of hypothyroidism, hyperthyroidism, and
                other thyroid disorders.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Droplets className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Diabetes Management</h3>
              <p className="text-muted-foreground">
                Comprehensive care plans for Type 1, Type 2, and gestational
                diabetes with lifestyle and medical support.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Activity className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Metabolic Health</h3>
              <p className="text-muted-foreground">
                Treatment for obesity, weight management, and metabolic syndrome
                to improve long-term health outcomes.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <HeartPulse className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Hormone Therapy</h3>
              <p className="text-muted-foreground">
                Personalized hormone replacement therapies for men and women to
                restore balance and vitality.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medical transition-all duration-300">
              <Shield className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Adrenal & Pituitary</h3>
              <p className="text-muted-foreground">
                Specialized treatment for adrenal insufficiency, pituitary
                disorders, and related hormone conditions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Hormone & Metabolism Specialists
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-hormones rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Laura Bennett</h3>
              <p className="text-muted-foreground mb-3">Endocrinologist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.9 (210 reviews)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Specialist in thyroid and diabetes care with 12+ years of
                experience.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-hormones rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Marcus Reed</h3>
              <p className="text-muted-foreground mb-3">Metabolism Specialist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.8 (180 reviews)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Expert in metabolic health, obesity, and weight management.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-medical transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-hormones rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Anita Desai</h3>
              <p className="text-muted-foreground mb-3">Hormone Therapy Specialist</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  4.9 (195 reviews)
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Providing hormone replacement therapy and endocrine care for
                men and women.
              </p>
              <Button variant="outline" size="sm">Book Consultation</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hormones text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Balanced Hormones, Healthier Metabolism
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Our endocrinology experts are here to restore your energy, balance,
            and overall well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="group">
              <Calendar className="mr-2 group-hover:scale-110 transition-transform" />
              Schedule Appointment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-orange-600"
            >
              <Activity className="mr-2" />
              Endocrine Helpline: (555) 456-ENDO
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HormonesMetabolism;
