import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UtensilsCrossed, 
  MessageCircle, 
  LineChart, 
  Bell, 
  BookOpen, 
  Users, 
  FileText, 
  Settings,
  Camera,
  Scale,
  Droplets,
  Heart
} from "lucide-react";

const clientFeatures = [
  {
    icon: UtensilsCrossed,
    title: "Diário Alimentar",
    description: "Registre suas refeições com fotos e busca em banco de alimentos",
  },
  {
    icon: FileText,
    title: "Plano Alimentar",
    description: "Acesse seu plano prescrito organizado por refeições",
  },
  {
    icon: MessageCircle,
    title: "Chat Interno",
    description: "Comunicação direta e segura com seu nutricionista",
  },
  {
    icon: LineChart,
    title: "Monitoramento",
    description: "Acompanhe peso, medidas e sintomas com gráficos",
  },
  {
    icon: Bell,
    title: "Lembretes",
    description: "Alertas para refeições, hidratação e diário",
  },
  {
    icon: BookOpen,
    title: "Receitas",
    description: "Biblioteca de receitas saudáveis personalizadas",
  },
];

const professionalFeatures = [
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Dashboard completo com status e histórico de pacientes",
  },
  {
    icon: UtensilsCrossed,
    title: "Criador de Planos",
    description: "Monte planos personalizados com banco de alimentos",
  },
  {
    icon: LineChart,
    title: "Evolução",
    description: "Visualize gráficos consolidados de cada cliente",
  },
  {
    icon: MessageCircle,
    title: "Central de Chat",
    description: "Comunicação unificada com todos os pacientes",
  },
  {
    icon: FileText,
    title: "Upload de Arquivos",
    description: "Envie PDFs, materiais e receitas para clientes",
  },
  {
    icon: Settings,
    title: "Configurações",
    description: "Gerencie perfil e modelos de prescrição",
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        {/* Client Features */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-secondary flex items-center justify-center">
              <Heart className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Para o Cliente</h2>
              <p className="text-muted-foreground">App mobile intuitivo e funcional</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {clientFeatures.map((feature, index) => (
              <Card 
                key={feature.title} 
                variant="feature"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Professional Features */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Para o Nutricionista</h2>
              <p className="text-muted-foreground">Portal web completo e profissional</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {professionalFeatures.map((feature, index) => (
              <Card 
                key={feature.title} 
                variant="feature"
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
