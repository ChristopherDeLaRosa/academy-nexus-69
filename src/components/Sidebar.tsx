import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  CreditCard, 
  FileText,
  Settings,
  Menu,
  X,
  BarChart3
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      description: "Vista general"
    },
    {
      id: "students",
      label: "Estudiantes", 
      icon: Users,
      description: "Gestión de estudiantes"
    },
    {
      id: "grades",
      label: "Calificaciones",
      icon: GraduationCap,
      description: "Sistema de notas"
    },
    {
      id: "attendance",
      label: "Asistencia",
      icon: CalendarCheck,
      description: "Control de asistencia"
    },
    {
      id: "payments",
      label: "Pagos",
      icon: CreditCard,
      description: "Gestión financiera"
    },
    {
      id: "reports",
      label: "Reportes",
      icon: BarChart3,
      description: "Informes y estadísticas"
    },
    {
      id: "settings",
      label: "Configuración",
      icon: Settings,
      description: "Ajustes del sistema"
    }
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen flex flex-col transition-smooth shadow-soft",
      isCollapsed ? "w-20" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                ERP Académico
              </h2>
              <p className="text-xs text-muted-foreground">
                Instituto San José
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-primary/10"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start space-x-3 transition-smooth",
                isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-primary" 
                  : "hover:bg-primary/10 hover:text-primary",
                isCollapsed && "justify-center px-2"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className={cn("h-5 w-5", isCollapsed ? "mx-auto" : "")} />
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="text-center">
            <div className="text-xs text-muted-foreground">
              © 2024 ERP Académico
            </div>
            <div className="text-xs text-muted-foreground">
              Versión 1.0.0
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;