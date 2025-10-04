import { useState } from "react";
import { Leaf, QrCode } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

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

export function QRChecklistSidebar() {
  const { open } = useSidebar();
  const [qrCodes, setQRCodes] = useState<QRCodeItem[]>(initialQRCodes);

  const toggleQRCode = (id: number) => {
    setQRCodes((prev) =>
      prev.map((qr) => (qr.id === id ? { ...qr, checked: !qr.checked } : qr))
    );
  };

  const completedCount = qrCodes.filter((qr) => qr.checked).length;
  const totalCount = qrCodes.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <Sidebar className="border-r border-sidebar-border">
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-sidebar-primary" />
          {open && <span className="font-semibold text-sidebar-foreground">EcoCheck</span>}
        </div>
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Progresso Geral
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-sidebar-foreground/70">Concluído</span>
                <span className="font-semibold text-sidebar-primary">
                  {completedCount}/{totalCount}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-center text-sidebar-foreground/60">
                {progressPercentage.toFixed(0)}% completo
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            QR Codes
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {qrCodes.map((qr) => (
                <SidebarMenuItem key={qr.id}>
                  <label
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors"
                  >
                    <Checkbox
                      checked={qr.checked}
                      onCheckedChange={() => toggleQRCode(qr.id)}
                      className="data-[state=checked]:bg-sidebar-primary data-[state=checked]:border-sidebar-primary"
                    />
                    <QrCode className="h-4 w-4 text-sidebar-foreground/70" />
                    <span className="text-sm text-sidebar-foreground">{qr.label}</span>
                  </label>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
