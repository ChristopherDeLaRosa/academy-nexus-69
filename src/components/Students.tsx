import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Filter,
  Download
} from "lucide-react";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");

  const students = [
    {
      id: "EST001",
      name: "Ana María García",
      grade: "10°A",
      age: 16,
      phone: "+57 300 123 4567",
      email: "ana.garcia@email.com",
      address: "Calle 45 #12-34, Bogotá",
      status: "active",
      average: 4.2,
      attendance: 95,
      paymentStatus: "up-to-date"
    },
    {
      id: "EST002", 
      name: "Carlos Rodríguez",
      grade: "11°B",
      age: 17,
      phone: "+57 301 234 5678",
      email: "carlos.rodriguez@email.com", 
      address: "Carrera 23 #56-78, Bogotá",
      status: "active",
      average: 3.8,
      attendance: 88,
      paymentStatus: "pending"
    },
    {
      id: "EST003",
      name: "María José López",
      grade: "9°A", 
      age: 15,
      phone: "+57 302 345 6789",
      email: "maria.lopez@email.com",
      address: "Avenida 68 #23-45, Bogotá",
      status: "active",
      average: 4.6,
      attendance: 98,
      paymentStatus: "up-to-date"
    },
    {
      id: "EST004",
      name: "Juan Pablo Morales",
      grade: "8°C",
      age: 14,
      phone: "+57 303 456 7890", 
      email: "juan.morales@email.com",
      address: "Calle 127 #45-67, Bogotá",
      status: "inactive",
      average: 3.2,
      attendance: 75,
      paymentStatus: "overdue"
    },
    {
      id: "EST005",
      name: "Sofía Hernández",
      grade: "10°B",
      age: 16,
      phone: "+57 304 567 8901",
      email: "sofia.hernandez@email.com",
      address: "Transversal 34 #12-89, Bogotá",
      status: "active",
      average: 4.4,
      attendance: 92,
      paymentStatus: "up-to-date"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-secondary text-secondary-foreground">Activo</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactivo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "up-to-date":
        return <Badge className="bg-secondary text-secondary-foreground">Al día</Badge>;
      case "pending":
        return <Badge className="bg-accent text-accent-foreground">Pendiente</Badge>;
      case "overdue":
        return <Badge className="bg-destructive text-destructive-foreground">Vencido</Badge>;
      default:
        return <Badge variant="outline">{paymentStatus}</Badge>;
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === "all" || student.grade.includes(filterGrade);
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Gestión de Estudiantes
          </h1>
          <p className="text-muted-foreground mt-2">
            Administra la información de todos los estudiantes
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Estudiante
        </Button>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, ID o grado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="hover:bg-primary/10">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" className="hover:bg-secondary/10">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de estudiantes */}
      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-medium transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      {getStatusBadge(student.status)}
                      {getPaymentBadge(student.paymentStatus)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">ID:</span>
                        <span>{student.id}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Grado:</span>
                        <span>{student.grade}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Promedio:</span>
                        <span className={`font-medium ${student.average >= 4.0 ? 'text-secondary' : student.average >= 3.0 ? 'text-accent' : 'text-destructive'}`}>
                          {student.average.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Asistencia:</span>
                        <span className={`font-medium ${student.attendance >= 90 ? 'text-secondary' : student.attendance >= 80 ? 'text-accent' : 'text-destructive'}`}>
                          {student.attendance}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{student.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="hover:bg-primary/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estadísticas rápidas */}
      <Card className="bg-gradient-hero text-white">
        <CardHeader>
          <CardTitle className="text-white">Resumen Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{students.length}</div>
              <div className="text-sm opacity-80">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {students.filter(s => s.status === 'active').length}
              </div>
              <div className="text-sm opacity-80">Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {students.filter(s => s.paymentStatus === 'up-to-date').length}
              </div>
              <div className="text-sm opacity-80">Al día</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {(students.reduce((acc, s) => acc + s.average, 0) / students.length).toFixed(1)}
              </div>
              <div className="text-sm opacity-80">Promedio General</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;