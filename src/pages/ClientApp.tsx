import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NutriLogo from "@/components/icons/NutriLogo";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Home,
  UtensilsCrossed,
  MessageCircle,
  LineChart,
  BookOpen,
  Camera,
  Plus,
  Check,
  ChevronRight,
  Droplets,
  Bell,
  Scale,
  Apple,
  Coffee,
  Moon,
  Sun,
  LogOut,
  Loader2,
} from "lucide-react";

const mealPlan = [
  {
    id: 1,
    name: "Café da Manhã",
    icon: Coffee,
    time: "07:00",
    items: ["1 xícara de café com leite", "2 fatias de pão integral", "1 ovo mexido", "1 fruta"],
    calories: 420,
    completed: true,
  },
  {
    id: 2,
    name: "Lanche da Manhã",
    icon: Apple,
    time: "10:00",
    items: ["1 iogurte natural", "1 colher de granola"],
    calories: 180,
    completed: true,
  },
  {
    id: 3,
    name: "Almoço",
    icon: Sun,
    time: "12:30",
    items: ["150g de frango grelhado", "4 colheres de arroz", "Salada à vontade", "1 fruta de sobremesa"],
    calories: 650,
    completed: false,
  },
  {
    id: 4,
    name: "Lanche da Tarde",
    icon: Apple,
    time: "16:00",
    items: ["1 banana", "10 castanhas"],
    calories: 200,
    completed: false,
  },
  {
    id: 5,
    name: "Jantar",
    icon: Moon,
    time: "19:30",
    items: ["150g de peixe grelhado", "Legumes refogados", "Salada verde"],
    calories: 450,
    completed: false,
  },
];

const navItems = [
  { icon: Home, label: "Início", path: "/app", active: true },
  { icon: UtensilsCrossed, label: "Plano", path: "/app", active: false },
  { icon: Plus, label: "Registrar", path: "/app", active: false, main: true },
  { icon: LineChart, label: "Evolução", path: "/app", active: false },
  { icon: MessageCircle, label: "Chat", path: "/app", active: false },
];

const ClientApp: React.FC = () => {
  const { user, loading, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [waterIntake, setWaterIntake] = useState(5);
  const [clientName, setClientName] = useState("Cliente");
  const waterGoal = 8;

  useEffect(() => {
    if (!loading && (!user || userRole !== 'client')) {
      navigate('/login/cliente');
    }
  }, [user, loading, userRole, navigate]);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('clients')
        .select('full_name')
        .eq('user_id', user.id)
        .single();
      
      if (data) {
        setClientName(data.full_name.split(' ')[0]);
      }
    };

    if (user && userRole === 'client') {
      fetchClientData();
    }
  }, [user, userRole]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || userRole !== 'client') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Status bar simulation */}
      <div className="bg-primary/5 px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>09:41</span>
        <div className="flex gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg px-4 py-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NutriLogo size={28} />
            <span className="text-lg font-bold text-gradient">NutriVida</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="iconSm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="iconSm" onClick={handleLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-24">
        {/* Greeting */}
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold">Olá, {clientName}! 👋</h1>
          <p className="text-muted-foreground">Vamos manter o foco hoje!</p>
        </div>

        {/* Daily Progress */}
        <div className="px-4 mb-6">
          <Card variant="gradient" className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Progresso de Hoje</p>
                  <p className="text-3xl font-bold">1.250 <span className="text-lg font-normal text-muted-foreground">/ 1.900 kcal</span></p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">66%</span>
                </div>
              </div>
              
              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Proteínas", value: "65g", max: "100g", color: "bg-nutrition-protein" },
                  { label: "Carboidratos", value: "150g", max: "220g", color: "bg-nutrition-carbs" },
                  { label: "Gorduras", value: "45g", max: "60g", color: "bg-nutrition-fats" },
                ].map((macro) => (
                  <div key={macro.label} className="text-center">
                    <div className="h-2 rounded-full bg-muted mb-2 overflow-hidden">
                      <div className={`h-full ${macro.color} rounded-full`} style={{ width: `${parseInt(macro.value) / parseInt(macro.max) * 100}%` }} />
                    </div>
                    <p className="text-xs font-medium">{macro.value}</p>
                    <p className="text-xs text-muted-foreground">{macro.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Water Intake */}
        <div className="px-4 mb-6">
          <Card variant="elevated">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-nutrition-water/10 flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-nutrition-water" />
                  </div>
                  <div>
                    <p className="font-semibold">Hidratação</p>
                    <p className="text-sm text-muted-foreground">{waterIntake} de {waterGoal} copos</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: waterGoal }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setWaterIntake(i + 1)}
                      className={`w-3 h-8 rounded-full transition-colors ${
                        i < waterIntake ? 'bg-nutrition-water' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Plan */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Plano Alimentar</h2>
            <Button variant="soft" size="sm">Ver tudo</Button>
          </div>
          
          <div className="space-y-3">
            {mealPlan.map((meal) => (
              <Card 
                key={meal.id} 
                variant={meal.completed ? "default" : "interactive"}
                className={meal.completed ? "opacity-70" : ""}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      meal.completed ? 'bg-success/10' : 'gradient-primary'
                    }`}>
                      {meal.completed ? (
                        <Check className="w-6 h-6 text-success" />
                      ) : (
                        <meal.icon className="w-6 h-6 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold">{meal.name}</p>
                        <span className="text-xs text-muted-foreground">{meal.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {meal.items.join(" • ")}
                      </p>
                      <p className="text-xs text-primary font-medium mt-1">{meal.calories} kcal</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <h2 className="text-lg font-bold mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Camera, label: "Foto Refeição", color: "secondary" },
              { icon: Scale, label: "Peso", color: "primary" },
              { icon: BookOpen, label: "Receitas", color: "accent" },
            ].map((action) => (
              <Card key={action.label} variant="interactive" className="p-4 text-center">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                  action.color === 'secondary' ? 'gradient-secondary' : 
                  action.color === 'primary' ? 'gradient-primary' : 'bg-accent'
                }`}>
                  <action.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-xs font-medium">{action.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 py-2 safe-area-pb">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            item.main ? (
              <button
                key={item.label}
                className="w-14 h-14 -mt-6 rounded-full gradient-primary shadow-medium flex items-center justify-center"
              >
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </button>
            ) : (
              <button
                key={item.label}
                className={`flex flex-col items-center gap-1 py-2 px-3 ${
                  item.active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          ))}
        </div>
      </nav>
    </div>
  );
};

export default ClientApp;
