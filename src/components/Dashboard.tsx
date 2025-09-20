import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Estudiantes",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "primary"
    },
    {
      title: "Cursos Activos",
      value: "42",
      change: "+3",
      trend: "up", 
      icon: GraduationCap,
      color: "secondary"
    },
    {
      title: "Asistencia Promedio",
      value: "87%",
      change: "+2%",
      trend: "up",
      icon: Calendar,
      color: "secondary"
    },
    {
      title: "Pagos Pendientes",
      value: "$15,340",
      change: "-8%",
      trend: "down",
      icon: CreditCard,
      color: "accent"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "payment",
      message: "Pago recibido de Ana García - Matrícula 2024",
      time: "Hace 5 min",
      status: "success"
    },
    {
      id: 2,
      type: "grade",
      message: "Calificaciones actualizadas para Matemáticas 3°A",
      time: "Hace 15 min", 
      status: "info"
    },
    {
      id: 3,
      type: "attendance",
      message: "Registro de asistencia completado para 2°B",
      time: "Hace 30 min",
      status: "success"
    },
    {
      id: 4,
      type: "alert",
      message: "5 estudiantes con pagos vencidos",
      time: "Hace 1 hora",
      status: "warning"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-secondary" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-accent" />;
      case "info":
        return <Clock className="h-4 w-4 text-primary" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Dashboard Académico
        </h1>
        <p className="text-muted-foreground mt-2">
          Resumen general de la institución educativa
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-medium transition-smooth">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 text-${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <Badge 
                    variant={stat.trend === "up" ? "secondary" : "destructive"}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span className="text-muted-foreground">vs mes anterior</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos y actividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progreso académico */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Progreso Académico por Nivel</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Primaria (1° - 6°)</span>
                  <span className="text-secondary font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Secundaria (7° - 9°)</span>
                  <span className="text-secondary font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Media (10° - 11°)</span>
                  <span className="text-secondary font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actividades recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas importantes */}
      <Card className="border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-accent">
            <AlertTriangle className="h-5 w-5" />
            <span>Alertas Importantes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-accent-light/20 rounded-lg">
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Pagos Vencidos</div>
            </div>
            <div className="text-center p-4 bg-destructive-light/20 rounded-lg">
              <div className="text-2xl font-bold text-destructive">12</div>
              <div className="text-sm text-muted-foreground">Asistencias Bajas</div>
            </div>
            <div className="text-center p-4 bg-primary-light/20 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Reuniones Hoy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;