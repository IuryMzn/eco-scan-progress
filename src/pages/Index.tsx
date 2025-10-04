import { Settings, MapPin, Calendar, Leaf } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QRChecklistSidebar } from "@/components/QRChecklistSidebar";
import { Button } from "@/components/ui/button";

const Index = () => {
  const userName = "João Silva";
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const location = "São Paulo, SP";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-eco">
        <QRChecklistSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card/80 backdrop-blur-sm border-b border-border shadow-green">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3 md:hidden">
                <SidebarTrigger />
              </div>
              
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-eco flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold text-foreground">{userName}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {currentDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {location}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Mobile info */}
            <div className="sm:hidden px-4 pb-3 space-y-1">
              <p className="text-sm font-semibold text-foreground">{userName}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {currentDate}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {location}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-lg shadow-green p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-eco flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                      EcoCheck Mobile
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Sistema de verificação sustentável
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                    <h2 className="font-semibold text-foreground mb-2">
                      Como usar
                    </h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Abra o menu lateral para ver todos os QR codes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Marque cada QR code conforme for verificando</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Acompanhe seu progresso em tempo real</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-eco rounded-lg text-white text-center">
                      <p className="text-3xl font-bold">10</p>
                      <p className="text-sm opacity-90">QR Codes Total</p>
                    </div>
                    <div className="p-4 bg-accent rounded-lg text-white text-center">
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm opacity-90">Verificados</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg text-secondary-foreground text-center">
                      <p className="text-3xl font-bold">0%</p>
                      <p className="text-sm">Progresso</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
