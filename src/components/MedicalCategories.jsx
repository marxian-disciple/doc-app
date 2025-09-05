import { Card } from "@/components/ui/card";
import { 
  Heart, 
  Brain, 
  Stethoscope, 
  Bone, 
  Baby, 
  Activity, 
  Wind, 
  Droplet, 
  Eye, 
  Sparkles, 
  Zap, 
  Smile,
} from "lucide-react";
import { Link } from "react-router-dom";

const medicalCategories = [
  {
    id: "general",
    name: "General and Primary Care",
    icon: Stethoscope,
    color: "bg-medical-general",
    gradient: "bg-gradient-general",
    path: "/general-primary-care"
  },
  {
    id: "mind",
    name: "Mind and Behavior",
    icon: Brain,
    color: "bg-medical-mind",
    gradient: "bg-gradient-mind",
    path: "/mind-behavior"
  },
  {
    id: "heart",
    name: "Heart and Circulatory System",
    icon: Heart,
    color: "bg-medical-heart",
    gradient: "bg-gradient-heart",
    path: "/heart-circulatory"
  },
  {
    id: "bones",
    name: "Bones, Muscles, and Movement",
    icon: Bone,
    color: "bg-medical-bones",
    gradient: "bg-gradient-to-br from-orange-400 to-orange-600",
    path: "/bones-muscles-movement"
  },
  {
    id: "WomensHealth",
    name: "Reproduction and Women's Health",
    icon: Baby,
    color: "bg-medical-reproductive",
    gradient: "bg-gradient-to-br from-pink-400 to-pink-600",
    path: "/WomensHealth"
  },
  {
    id: "digestiveHealth",
    name: "Digestive System",
    icon: Activity,
    color: "bg-medical-digestive",
    gradient: "bg-gradient-to-br from-green-400 to-green-600",
    path: "/digestiveHealth"
  },
  {
    id: "Lungs",
    name: "Lungs and Breathing",
    icon: Wind,
    color: "bg-medical-lungs",
    gradient: "bg-gradient-to-br from-cyan-400 to-cyan-600",
    path: "/Lungs"
  },
  {
    id: "bloodCancerImmunity",
    name: "Blood, Cancer, and Immunity",
    icon: Droplet,
    color: "bg-medical-blood",
    gradient: "bg-gradient-to-br from-red-500 to-red-700",
    path: "/bloodCancerImmunity"
  },
  {
    id: "eyes",
    name: "Eyes, Ears, Nose, and Throat",
    icon: Eye,
    color: "bg-medical-eyes",
    gradient: "bg-gradient-to-br from-amber-400 to-amber-600",
    path: "/eyes"
  },
  {
    id: "skin",
    name: "Skin, Hair and Appearance",
    icon: Sparkles,
    color: "bg-medical-skin",
    gradient: "bg-gradient-to-br from-orange-300 to-orange-500",
    path: "/skin"
  },
  {
    id: "hormones",
    name: "Hormones and Metabolism",
    icon: Zap,
    color: "bg-medical-hormones",
    gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    path: "/hormones"
  },
  {
    id: "teeth",
    name: "Teeth and Mouth",
    icon: Smile,
    color: "bg-medical-teeth",
    gradient: "bg-gradient-to-br from-gray-200 to-gray-400",
    path: "/teeth"
  },
  
];

const MedicalCategories = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-primary-lighter/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Medical Specialties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your area of specialization or the type of care you're seeking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {medicalCategories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Link key={category.id} to={category.path}>
                <Card 
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-medical text-white ${category.gradient}`}
                >
                  <div className="text-center">
                    <IconComponent className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2 leading-tight">
                      {category.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MedicalCategories;
//export { medicalCategories };
