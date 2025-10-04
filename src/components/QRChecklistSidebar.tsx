import { Leaf, QrCode, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

interface QRChecklistSidebarProps {
  qrCodes: QRCodeItem[];
}

export function QRChecklistSidebar({ qrCodes }: QRChecklistSidebarProps) {
  const { open } = useSidebar();
  const navigate = useNavigate();

  const completedCount = qrCodes.filter((qr) => qr.checked).length;
  const totalCount = qrCodes.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const handleQuizClick = () => {
    navigate("/quiz");
  };

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
                  <div className="flex items-center gap-3 px-4 py-3 rounded-md">
                    <Checkbox
                      checked={qr.checked}
                      disabled
                      className="data-[state=checked]:bg-sidebar-primary data-[state=checked]:border-sidebar-primary opacity-100"
                    />
                    <QrCode className="h-4 w-4 text-sidebar-foreground/70" />
                    <span className="text-sm text-sidebar-foreground">{qr.label}</span>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80">
            Finalização
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <button
                  onClick={handleQuizClick}
                  className="flex items-center gap-3 px-4 py-3 w-full cursor-pointer hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  <ClipboardCheck className="h-4 w-4 text-sidebar-primary" />
                  <span className="text-sm font-medium text-sidebar-foreground">
                    Quiz Final
                  </span>
                </button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
