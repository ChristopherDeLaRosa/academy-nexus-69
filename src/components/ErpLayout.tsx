import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Students from "./Students";
import Grades from "./Grades";
import Attendance from "./Attendance";
import Payments from "./Payments";

const ErpLayout = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <Students />;
      case "grades":
        return <Grades />;
      case "attendance":
        return <Attendance />;
      case "payments":
        return <Payments />;
      case "reports":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-muted-foreground mb-2">
                Módulo de Reportes
              </h2>
              <p className="text-muted-foreground">
                En desarrollo - Próximamente disponible
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-muted-foreground mb-2">
                Configuración del Sistema
              </h2>
              <p className="text-muted-foreground">
                En desarrollo - Próximamente disponible
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default ErpLayout;