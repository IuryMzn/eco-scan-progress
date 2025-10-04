import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScanSuccess, onClose }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode("qr-reader");
        scannerRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScanSuccess(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            // Silently ignore scan errors
          }
        );

        setIsScanning(true);
      } catch (err) {
        console.error("Error starting scanner:", err);
        toast.error("Erro ao iniciar câmera. Verifique as permissões.");
        onClose();
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current?.clear();
        })
        .catch((err) => {
          console.error("Error stopping scanner:", err);
        });
      setIsScanning(false);
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-sidebar">
        <h2 className="text-lg font-semibold text-sidebar-foreground">
          Escaneie o QR Code
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
          <p className="text-center text-white mt-4 text-sm">
            Posicione o QR code dentro do quadrado
          </p>
        </div>
      </div>
    </div>
  );
}
