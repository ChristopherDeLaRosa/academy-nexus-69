import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Plus, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  Award,
  AlertTriangle,
  CheckCircle,
  Edit,
  Download
} from "lucide-react";

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const subjects = [
    "Matemáticas", "Español", "Ciencias Naturales", "Ciencias Sociales", 
    "Inglés", "Educación Física", "Artes", "Ética"
  ];

  const grades = [
    {
      studentId: "EST001",
      studentName: "Ana María García",
      grade: "10°A",
      subject: "Matemáticas",
      period1: 4.2,
      period2: 4.5,
      period3: 4.1,
      average: 4.27,
      status: "excellent"
    },
    {
      studentId: "EST001",
      studentName: "Ana María García", 
      grade: "10°A",
      subject: "Español",
      period1: 4.0,
      period2: 4.3,
      period3: 4.4,
      average: 4.23,
      status: "excellent"
    },
    {
      studentId: "EST002",
      studentName: "Carlos Rodríguez",
      grade: "11°B", 
      subject: "Matemáticas",
      period1: 3.5,
      period2: 3.8,
      period3: 4.0,
      average: 3.77,
      status: "good"
    },
    {
      studentId: "EST002",
      studentName: "Carlos Rodríguez",
      grade: "11°B",
      subject: "Inglés", 
      period1: 4.1,
      period2: 3.9,
      period3: 4.2,
      average: 4.07,
      status: "excellent"
    },
    {
      studentId: "EST003",
      studentName: "María José López",
      grade: "9°A",
      subject: "Ciencias Naturales",
      period1: 4.7,
      period2: 4.6,
      period3: 4.8,
      average: 4.70,
      status: "outstanding"
    },
    {
      studentId: "EST004",
      studentName: "Juan Pablo Morales",
      grade: "8°C",
      subject: "Matemáticas",
      period1: 2.8,
      period2: 3.1,
      period3: 3.3,
      average: 3.07,
      status: "needs-improvement"
    }
  ];

  const getStatusBadge = (status: string, average: number) => {
    if (average >= 4.5) {
      return (
        <Badge className="bg-gradient-success text-white">
          <Award className="h-3 w-3 mr-1" />
          Sobresaliente
        </Badge>
      );
    } else if (average >= 4.0) {
      return (
        <Badge className="bg-secondary text-secondary-foreground">
          <CheckCircle className="h-3 w-3 mr-1" />
          Excelente
        </Badge>
      );
    } else if (average >= 3.5) {
      return (
        <Badge className="bg-primary text-primary-foreground">
          <TrendingUp className="h-3 w-3 mr-1" />
          Bueno
        </Badge>
      );
    } else if (average >= 3.0) {
      return (
        <Badge className="bg-accent text-accent-foreground">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Aceptable
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-destructive text-destructive-foreground">
          <TrendingDown className="h-3 w-3 mr-1" />
          Insuficiente
        </Badge>
      );
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 4.5) return "text-green-600";
    if (grade >= 4.0) return "text-secondary";
    if (grade >= 3.5) return "text-primary";
    if (grade >= 3.0) return "text-accent";
    return "text-destructive";
  };

  const filteredGrades = grades.filter(gradeRecord => {
    const matchesSearch = gradeRecord.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gradeRecord.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gradeRecord.grade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || gradeRecord.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  // Calcular estadísticas
  const averageGrade = grades.reduce((sum, grade) => sum + grade.average, 0) / grades.length;
  const excellentCount = grades.filter(g => g.average >= 4.0).length;
  const needsImprovementCount = grades.filter(g => g.average < 3.0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Sistema de Calificaciones
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestión y seguimiento del rendimiento académico
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="hover:bg-secondary/10">
            <Download className="h-4 w-4 mr-2" />
            Boletín
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Calificación
          </Button>
        </div>
      </div>

      {/* Métricas académicas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Promedio General
            </CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGradeColor(averageGrade)}`}>
              {averageGrade.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Todas las materias
            </p>
          </CardContent>
        </Card>

        <Card className="border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rendimiento Alto
            </CardTitle>
            <Award className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{excellentCount}</div>
            <p className="text-xs text-muted-foreground">
              Calificaciones ≥ 4.0
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Requieren Apoyo
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{needsImprovementCount}</div>
            <p className="text-xs text-muted-foreground">
              Calificaciones &lt; 3.0
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasa de Aprobación
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {(((grades.length - needsImprovementCount) / grades.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Estudiantes aprobados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar estudiante o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="all">Todas las materias</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de calificaciones */}
      <div className="grid gap-4">
        {filteredGrades.map((gradeRecord, index) => (
          <Card key={`${gradeRecord.studentId}-${gradeRecord.subject}-${index}`} className="hover:shadow-medium transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {gradeRecord.studentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{gradeRecord.studentName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {gradeRecord.studentId} - {gradeRecord.grade} | {gradeRecord.subject}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(gradeRecord.status, gradeRecord.average)}
                        <Button variant="outline" size="sm" className="hover:bg-primary/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Calificaciones por período */}
                      <div>
                        <h4 className="font-medium text-sm mb-3">Calificaciones por Período</h4>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Período 1</div>
                            <div className={`font-bold text-lg ${getGradeColor(gradeRecord.period1)}`}>
                              {gradeRecord.period1.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Período 2</div>
                            <div className={`font-bold text-lg ${getGradeColor(gradeRecord.period2)}`}>
                              {gradeRecord.period2.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">Período 3</div>
                            <div className={`font-bold text-lg ${getGradeColor(gradeRecord.period3)}`}>
                              {gradeRecord.period3.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Promedio y progreso */}
                      <div>
                        <h4 className="font-medium text-sm mb-3">Rendimiento</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Promedio Final:</span>
                            <span className={`font-bold text-xl ${getGradeColor(gradeRecord.average)}`}>
                              {gradeRecord.average.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progreso</span>
                              <span>{((gradeRecord.average / 5) * 100).toFixed(0)}%</span>
                            </div>
                            <Progress 
                              value={(gradeRecord.average / 5) * 100} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen por materias */}
      <Card className="bg-gradient-hero text-white">
        <CardHeader>
          <CardTitle className="text-white">Rendimiento por Materia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects.slice(0, 4).map(subject => {
              const subjectGrades = grades.filter(g => g.subject === subject);
              const subjectAverage = subjectGrades.length > 0 
                ? subjectGrades.reduce((sum, g) => sum + g.average, 0) / subjectGrades.length 
                : 0;
              
              return (
                <div key={subject} className="text-center">
                  <div className="text-2xl font-bold mb-1">
                    {subjectAverage.toFixed(1)}
                  </div>
                  <div className="text-sm opacity-80">{subject}</div>
                  <Progress 
                    value={(subjectAverage / 5) * 100} 
                    className="mt-2 h-1 bg-white/20" 
                  />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Grades;