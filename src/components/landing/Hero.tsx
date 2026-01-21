import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, User, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import NutriLogo from "@/components/icons/NutriLogo";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo and Badge */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <NutriLogo size={48} />
            <span className="text-3xl font-bold text-gradient">NutriVida</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4" />
            Plataforma completa para nutricionistas
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Transforme sua prática nutricional com{" "}
            <span className="text-gradient">tecnologia integrada</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Um sistema completo que conecta nutricionistas e pacientes. 
            Gerencie planos alimentares, acompanhe evolução e comunique-se 
            de forma simples e eficiente.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/login/profissional">
              <Button variant="hero" size="xl" className="group">
                <Briefcase className="w-5 h-5" />
                Sou Profissional
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/login/cliente">
              <Button variant="outline" size="xl" className="group">
                <User className="w-5 h-5" />
                Sou Cliente
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Device Preview Cards */}
          <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/login/profissional" className="group">
              <div className="relative p-6 rounded-2xl bg-card shadow-soft border border-border/50 hover:shadow-medium transition-all hover:scale-[1.02] cursor-pointer">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Área do Profissional</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Interface completa para nutricionistas gerenciarem pacientes, 
                  criarem planos alimentares e acompanharem resultados.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Dashboard", "Criar Clientes", "Planos", "Relatórios"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <Link to="/login/cliente" className="group">
              <div className="relative p-6 rounded-2xl bg-card shadow-soft border border-border/50 hover:shadow-medium transition-all hover:scale-[1.02] cursor-pointer">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full gradient-secondary flex items-center justify-center">
                  <User className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Área do Cliente</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Acesse seu plano alimentar, registre refeições, 
                  acompanhe sua evolução e converse com seu nutricionista.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Diário", "Plano", "Receitas", "Evolução"].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
