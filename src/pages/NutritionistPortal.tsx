import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NutriLogo from "@/components/icons/NutriLogo";
import { 
  Users, 
  MessageCircle, 
  FileText, 
  LineChart, 
  Settings, 
  UtensilsCrossed,
  Home,
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  Plus
} from "lucide-react";

const mockClients = [
  { id: 1, name: "Maria Silva", status: "Ativo", lastInteraction: "Hoje", adherence: 85, trend: "up" },
  { id: 2, name: "João Santos", status: "Ativo", lastInteraction: "Ontem", adherence: 72, trend: "up" },
  { id: 3, name: "Ana Oliveira", status: "Pendente", lastInteraction: "3 dias", adherence: 45, trend: "down" },
  { id: 4, name: "Carlos Lima", status: "Ativo", lastInteraction: "Hoje", adherence: 92, trend: "up" },
  { id: 5, name: "Beatriz Costa", status: "Ativo", lastInteraction: "2 dias", adherence: 68, trend: "stable" },
];

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Users, label: "Clientes", active: false },
  { icon: UtensilsCrossed, label: "Planos", active: false },
  { icon: MessageCircle, label: "Mensagens", active: false },
  { icon: FileText, label: "Arquivos", active: false },
  { icon: LineChart, label: "Relatórios", active: false },
  { icon: Settings, label: "Configurações", active: false },
];

const NutritionistPortal: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <NutriLogo size={36} />
            {sidebarOpen && <span className="text-xl font-bold text-gradient">NutriVida</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-primary text-primary-foreground shadow-soft' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              N
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">Dra. Nutricionista</p>
                <p className="text-xs text-muted-foreground">CRN 12345</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Bem-vinda de volta!</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Buscar cliente..." 
                  className="pl-10 pr-4 py-2 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total de Clientes", value: "24", icon: Users, color: "primary" },
              { label: "Mensagens Novas", value: "8", icon: MessageCircle, color: "secondary" },
              { label: "Planos Ativos", value: "18", icon: FileText, color: "accent" },
              { label: "Adesão Média", value: "78%", icon: TrendingUp, color: "success" },
            ].map((stat) => (
              <Card key={stat.label} variant="elevated">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Clients List */}
          <Card variant="elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Clientes Recentes</CardTitle>
              <Button variant="soft" size="sm">
                <Plus className="w-4 h-4" />
                Novo Cliente
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockClients.map((client) => (
                  <div 
                    key={client.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{client.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Última interação: {client.lastInteraction}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {client.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-success" />
                          ) : client.trend === "down" ? (
                            <TrendingDown className="w-4 h-4 text-destructive" />
                          ) : null}
                          <span className="font-semibold">{client.adherence}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Adesão</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        client.status === "Ativo" 
                          ? "bg-success/10 text-success" 
                          : "bg-warning/10 text-warning"
                      }`}>
                        {client.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="interactive" className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                  <UtensilsCrossed className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Criar Plano</h3>
                  <p className="text-sm text-muted-foreground">Novo plano alimentar</p>
                </div>
              </div>
            </Card>
            <Card variant="interactive" className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-secondary flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Mensagens</h3>
                  <p className="text-sm text-muted-foreground">8 não lidas</p>
                </div>
              </div>
            </Card>
            <Card variant="interactive" className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <FileText className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-bold">Materiais</h3>
                  <p className="text-sm text-muted-foreground">Enviar arquivos</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NutritionistPortal;
