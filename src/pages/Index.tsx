import { useState } from "react";
import { Settings, MapPin, Calendar, Leaf, ScanLine } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QRChecklistSidebar } from "@/components/QRChecklistSidebar";
import { QRScanner } from "@/components/QRScanner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRCodeItem {
  id: number;
  label: string;
  checked: boolean;
}

const initialQRCodes: QRCodeItem[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  label: `QR CODE ${i + 1}`,
  checked: false,
}));

const Index = () => {
  const userName = "João Silva";
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const location = "São Paulo, SP";

  const [qrCodes, setQRCodes] = useState<QRCodeItem[]>(initialQRCodes);
  const [showScanner, setShowScanner] = useState(false);

  const handleScanSuccess = (decodedText: string) => {
    // Expected format: "QRCODE-1", "QRCODE-2", etc.
    const match = decodedText.match(/QRCODE-(\d+)/i);
    
    if (match) {
      const qrId = parseInt(match[1]);
      
      setQRCodes((prev) =>
        prev.map((qr) =>
          qr.id === qrId ? { ...qr, checked: true } : qr
        )
      );

      toast.success(`QR Code ${qrId} verificado com sucesso!`, {
        description: "Continue escaneando os próximos códigos.",
      });
    } else {
      toast.error("QR Code não reconhecido", {
        description: "Certifique-se de escanear um QR code válido do sistema.",
      });
    }

    setShowScanner(false);
  };

  const completedCount = qrCodes.filter((qr) => qr.checked).length;
  const totalCount = qrCodes.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-eco">
        <QRChecklistSidebar qrCodes={qrCodes} />
        
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
                        <span>Clique no botão "Escanear QR Code" abaixo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Posicione a câmera no QR code para verificar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Após verificar todos, acesse o Quiz Final no menu</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-eco rounded-lg text-white text-center">
                      <p className="text-3xl font-bold">{totalCount}</p>
                      <p className="text-sm opacity-90">QR Codes Total</p>
                    </div>
                    <div className="p-4 bg-accent rounded-lg text-white text-center">
                      <p className="text-3xl font-bold">{completedCount}</p>
                      <p className="text-sm opacity-90">Verificados</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg text-secondary-foreground text-center">
                      <p className="text-3xl font-bold">{progressPercentage.toFixed(0)}%</p>
                      <p className="text-sm">Progresso</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Floating Scan Button */}
          <Button
            onClick={() => setShowScanner(true)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-green bg-gradient-eco hover:opacity-90 transition-opacity"
            size="icon"
          >
            <ScanLine className="h-6 w-6" />
          </Button>
        </div>

        {/* QR Scanner Modal */}
        {showScanner && (
          <QRScanner
            onScanSuccess={handleScanSuccess}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
