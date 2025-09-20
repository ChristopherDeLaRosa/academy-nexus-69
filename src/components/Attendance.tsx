import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { 
  Search, 
  Calendar as CalendarIcon, 
  UserCheck, 
  UserX, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  const attendanceData = [
    {
      studentId: "EST001",
      studentName: "Ana María García",
      grade: "10°A",
      status: "present",
      arrivalTime: "07:45",
      notes: ""
    },
    {
      studentId: "EST002", 
      studentName: "Carlos Rodríguez",
      grade: "11°B",
      status: "late",
      arrivalTime: "08:15",
      notes: "Retraso justificado - cita médica"
    },
    {
      studentId: "EST003",
      studentName: "María José López",
      grade: "9°A",
      status: "present",
      arrivalTime: "07:30",
      notes: ""
    },
    {
      studentId: "EST004",
      studentName: "Juan Pablo Morales", 
      grade: "8°C",
      status: "absent",
      arrivalTime: "",
      notes: "Enfermedad - incapacidad médica"
    },
    {
      studentId: "EST005",
      studentName: "Sofía Hernández",
      grade: "10°B", 
      status: "present",
      arrivalTime: "07:40",
      notes: ""
    },
    {
      studentId: "EST006",
      studentName: "Diego Martínez",
      grade: "11°A",
      status: "late",
      arrivalTime: "08:20",
      notes: "Problema de transporte"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-secondary text-secondary-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Presente
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Tarde
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <XCircle className="h-3 w-3 mr-1" />
            Ausente
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <UserCheck className="h-5 w-5 text-secondary" />;
      case "late":
        return <Clock className="h-5 w-5 text-accent" />;
      case "absent":
        return <UserX className="h-5 w-5 text-destructive" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const filteredAttendance = attendanceData.filter(record =>
    record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentCount = attendanceData.filter(r => r.status === 'present').length;
  const lateCount = attendanceData.filter(r => r.status === 'late').length;
  const absentCount = attendanceData.filter(r => r.status === 'absent').length;
  const attendanceRate = ((presentCount + lateCount) / attendanceData.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Control de Asistencia
          </h1>
          <p className="text-muted-foreground mt-2">
            Registro diario de asistencia estudiantil
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:bg-secondary/10">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <UserCheck className="h-4 w-4 mr-2" />
            Tomar Asistencia
          </Button>
        </div>
      </div>

      {/* Métricas de asistencia */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Presentes
            </CardTitle>
            <UserCheck className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{presentCount}</div>
            <p className="text-xs text-muted-foreground">
              {((presentCount / attendanceData.length) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Llegadas Tarde
            </CardTitle>
            <Clock className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{lateCount}</div>
            <p className="text-xs text-muted-foreground">
              {((lateCount / attendanceData.length) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ausencias
            </CardTitle>
            <UserX className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{absentCount}</div>
            <p className="text-xs text-muted-foreground">
              {((absentCount / attendanceData.length) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasa de Asistencia
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {attendanceRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Promedio del día
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendario */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Fecha</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Fecha seleccionada:</span>
                <span className="font-medium">
                  {selectedDate.toLocaleDateString('es-CO')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total estudiantes:</span>
                <span className="font-medium">{attendanceData.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de asistencia */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Registro de Asistencia</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAttendance.map((record) => (
                <div key={record.studentId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                        {record.studentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{record.studentName}</div>
                      <div className="text-sm text-muted-foreground">
                        {record.studentId} - {record.grade}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {record.arrivalTime && (
                      <div className="text-right">
                        <div className="text-sm font-medium">{record.arrivalTime}</div>
                        <div className="text-xs text-muted-foreground">Hora de llegada</div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      {getStatusBadge(record.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notas especiales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <span>Observaciones del Día</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {attendanceData
              .filter(record => record.notes)
              .map((record) => (
                <div key={record.studentId} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {record.studentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{record.studentName}</div>
                    <div className="text-sm text-muted-foreground mt-1">{record.notes}</div>
                  </div>
                  {getStatusBadge(record.status)}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;