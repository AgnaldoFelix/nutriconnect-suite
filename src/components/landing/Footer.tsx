import React from "react";
import NutriLogo from "@/components/icons/NutriLogo";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <NutriLogo size={32} />
            <span className="text-xl font-bold text-gradient">NutriVida</span>
          </div>
          
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-secondary fill-secondary" /> para nutricionistas
          </p>

          <p className="text-muted-foreground text-xs">
            © 2025 NutriVida. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
