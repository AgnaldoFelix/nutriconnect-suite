import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface CreateClientDialogProps {
  onClientCreated: () => void;
}

const CreateClientDialog: React.FC<CreateClientDialogProps> = ({ onClientCreated }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    birthDate: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    try {
      // Create auth user for client via edge function
      const { data: authData, error: authError } = await supabase.functions.invoke('create-client', {
        body: {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          birthDate: formData.birthDate || null,
          notes: formData.notes,
          professionalId: user.id,
        },
      });

      if (authError) throw authError;
      if (authData?.error) throw new Error(authData.error);

      toast.success('Cliente criado com sucesso!');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        birthDate: '',
        notes: '',
      });
      setOpen(false);
      onClientCreated();
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Novo Cliente</DialogTitle>
          <DialogDescription>
            Preencha os dados do cliente. Ele receberá as credenciais para acessar o aplicativo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo *</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Nome do cliente"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="cliente@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha inicial *</Label>
            <Input
              id="password"
              name="password"
              type="text"
              placeholder="Senha para o cliente"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
            />
            <p className="text-xs text-muted-foreground">
              Informe esta senha ao cliente. Ele poderá alterá-la depois.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Observações sobre o cliente..."
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Criar Cliente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClientDialog;
