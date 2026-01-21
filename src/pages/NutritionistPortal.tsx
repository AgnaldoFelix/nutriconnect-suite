import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NutriLogo from "@/components/icons/NutriLogo";
import CreateClientDialog from "@/components/clients/CreateClientDialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
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
  LogOut,
  Loader2
} from "lucide-react";

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

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
  const { user, loading, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);

  useEffect(() => {
    if (!loading && (!user || userRole !== 'professional')) {
      navigate('/login/profissional');
    }
  }, [user, loading, userRole, navigate]);

  const fetchClients = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoadingClients(false);
    }
  };

  useEffect(() => {
    if (user && userRole === 'professional') {
      fetchClients();
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

  if (!user || userRole !== 'professional') {
    return null;
  }

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

        {/* Profile & Logout */}
        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.email}</p>
                <p className="text-xs text-muted-foreground">Profissional</p>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {sidebarOpen && "Sair"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Bem-vindo(a) de volta!</p>
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
              { label: "Total de Clientes", value: clients.length.toString(), icon: Users, color: "primary" },
              { label: "Mensagens Novas", value: "0", icon: MessageCircle, color: "secondary" },
              { label: "Planos Ativos", value: clients.filter(c => c.active).length.toString(), icon: FileText, color: "accent" },
              { label: "Adesão Média", value: "-", icon: TrendingUp, color: "success" },
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
              <CardTitle className="text-xl">Clientes</CardTitle>
              <CreateClientDialog onClientCreated={fetchClients} />
            </CardHeader>
            <CardContent>
              {loadingClients ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : clients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum cliente cadastrado ainda.</p>
                  <p className="text-sm">Clique em "Novo Cliente" para começar.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {clients.map((client) => (
                    <div 
                      key={client.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {client.full_name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold">{client.full_name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{client.email}</span>
                          {client.phone && <span>• {client.phone}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          client.active 
                            ? "bg-success/10 text-success" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {client.active ? "Ativo" : "Inativo"}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  <p className="text-sm text-muted-foreground">0 não lidas</p>
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
