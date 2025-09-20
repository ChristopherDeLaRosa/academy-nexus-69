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
  Download, 
  Filter,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  Calendar
} from "lucide-react";

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const payments = [
    {
      id: "PAY001",
      studentId: "EST001",
      studentName: "Ana María García",
      concept: "Matrícula 2024",
      amount: 850000,
      dueDate: "2024-01-15",
      paidDate: "2024-01-12",
      status: "paid",
      method: "Transferencia bancaria"
    },
    {
      id: "PAY002",
      studentId: "EST002", 
      studentName: "Carlos Rodríguez",
      concept: "Pensión Febrero",
      amount: 280000,
      dueDate: "2024-02-05",
      paidDate: null,
      status: "pending",
      method: null
    },
    {
      id: "PAY003",
      studentId: "EST003",
      studentName: "María José López", 
      concept: "Pensión Enero",
      amount: 280000,
      dueDate: "2024-01-05",
      paidDate: "2024-01-03",
      status: "paid",
      method: "Efectivo"
    },
    {
      id: "PAY004",
      studentId: "EST004",
      studentName: "Juan Pablo Morales",
      concept: "Pensión Diciembre",
      amount: 280000,
      dueDate: "2023-12-05",
      paidDate: null,
      status: "overdue",
      method: null
    },
    {
      id: "PAY005",
      studentId: "EST001",
      studentName: "Ana María García",
      concept: "Seguro estudiantil",
      amount: 150000,
      dueDate: "2024-03-01",
      paidDate: null,
      status: "pending",
      method: null
    },
    {
      id: "PAY006",
      studentId: "EST005",
      studentName: "Sofía Hernández",
      concept: "Pensión Febrero",
      amount: 280000,
      dueDate: "2024-02-05",
      paidDate: "2024-02-01",
      status: "paid",
      method: "Tarjeta de crédito"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-secondary text-secondary-foreground">
            <CheckCircle className="h-3 w-3 mr-1" />
            Pagado
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Vencido
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = (totalPaid / (totalPaid + totalPending + totalOverdue)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Gestión de Pagos
          </h1>
          <p className="text-muted-foreground mt-2">
            Control financiero y estados de cuenta
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Registrar Pago
        </Button>
      </div>

      {/* Métricas financieras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-secondary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Recaudado
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {formatCurrency(totalPaid)}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter(p => p.status === 'paid').length} pagos completados
            </p>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendiente de Cobro
            </CardTitle>
            <Clock className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(totalPending)}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter(p => p.status === 'pending').length} pagos pendientes
            </p>
          </CardContent>
        </Card>

        <Card className="border-destructive/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pagos Vencidos
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(totalOverdue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {payments.filter(p => p.status === 'overdue').length} pagos vencidos
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasa de Recaudo
            </CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {collectionRate.toFixed(1)}%
            </div>
            <Progress value={collectionRate} className="mt-2 h-2" />
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
                  placeholder="Buscar por estudiante, concepto o ID..."
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

      {/* Lista de pagos */}
      <div className="grid gap-4">
        {filteredPayments.map((payment) => (
          <Card key={payment.id} className="hover:shadow-medium transition-smooth">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                      {payment.studentName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{payment.studentName}</h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(payment.amount)}</div>
                        <div className="text-sm text-muted-foreground">#{payment.id}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Concepto:</span>
                        <span>{payment.concept}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Vence: {formatDate(payment.dueDate)}</span>
                      </div>
                      {payment.paidDate && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-secondary" />
                          <span>Pagado: {formatDate(payment.paidDate)}</span>
                        </div>
                      )}
                      {payment.method && (
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>{payment.method}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen financiero */}
      <Card className="bg-gradient-hero text-white">
        <CardHeader>
          <CardTitle className="text-white">Resumen Financiero del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {formatCurrency(totalPaid + totalPending + totalOverdue)}
              </div>
              <div className="text-sm opacity-80">Total Facturado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {collectionRate.toFixed(1)}%
              </div>
              <div className="text-sm opacity-80">Efectividad de Recaudo</div>
              <Progress value={collectionRate} className="mt-2 h-2 bg-white/20" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {payments.filter(p => p.status === 'overdue').length}
              </div>
              <div className="text-sm opacity-80">Cuentas por Cobrar</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;