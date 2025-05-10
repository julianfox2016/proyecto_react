// src/components/gestion/Gestion.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
// Componentes importados
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import Clientes from './Clientes';
import Analisis from './Analisis';
import Reportes from './Reportes';
import Configuracion from './Configuracion';
import AIAssistant from './AIAssistant';
import LoadingOverlay from './LoadingOverlay';
import './Gestion.css';
const Gestion = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  // Estados
  const [activeSection, setActiveSection] = useState('dashboard');
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [clientQuery, setClientQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportSettings, setReportSettings] = useState({
    format: 'pdf',
    indicators: ['ROA', 'ROE', 'Liquidez'],
    includeComments: true,
  });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  // Cargar datos iniciales
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const mockEmpresas = [
        {
          id: 1,
          nombre: "TechCorp",
          sector: "Tecnología",
          ultimaConsulta: "2023-11-10",
          logo: 'techcorp.png',
          riesgo: 'Bajo',
          estado: 'Activo'
        },
        {
          id: 2,
          nombre: "FoodPlus",
          sector: "Alimentación",
          ultimaConsulta: "2023-11-08",
          logo: 'foodplus.png',
          riesgo: 'Medio',
          estado: 'Activo'
        },
        {
          id: 3,
          nombre: "BuildMaster",
          sector: "Construcción",
          ultimaConsulta: "2023-11-05",
          logo: 'buildmaster.png',
          riesgo: 'Alto',
          estado: 'En observación'
        },
        {
          id: 4,
          nombre: "HealthCare Solutions",
          sector: "Salud",
          ultimaConsulta: "2023-11-12",
          logo: 'healthcare.png',
          riesgo: 'Bajo',
          estado: 'Activo'
        },
        {
          id: 5,
          nombre: "EduFuture",
          sector: "Educación",
          ultimaConsulta: "2023-11-01",
          logo: 'edufuture.png',
          riesgo: 'Medio',
          estado: 'Activo'
        }
      ];
      setEmpresas(mockEmpresas);
      setIsLoading(false);
      setNotifications([
        {
          id: 1,
          title: "Nuevo informe disponible",
          message: "El informe trimestral de TechCorp está listo para revisión",
          date: "2023-11-15",
          read: false
        },
        {
          id: 2,
          title: "Alerta financiera",
          message: "BuildMaster ha excedido su ratio de endeudamiento recomendado",
          date: "2023-11-14",
          read: false
        }
      ]);
    }, 1000);
  }, []);
  // Cargar datos financieros al seleccionar empresa
  useEffect(() => {
    if (selectedEmpresa) {
      setIsLoading(true);
      setTimeout(() => {
        const mockFinancialData = {
          empresaId: selectedEmpresa.id,
          indicadores: {
            ROA: (Math.random() * 10).toFixed(2),
            ROE: (Math.random() * 15).toFixed(2),
            margenNeto: (Math.random() * 20).toFixed(2),
            liquidez: (Math.random() * 5).toFixed(2),
            endeudamiento: (Math.random() * 100).toFixed(2),
            rotacionInventario: (Math.random() * 12).toFixed(2),
            coberturaIntereses: (Math.random() * 8).toFixed(2)
          },
          tendencia: Array(12).fill(0).map((_, i) => Math.random() * 100),
          alertas: [
            selectedEmpresa.riesgo === 'Alto' ? "Endeudamiento sobre límite recomendado" : "",
            "Baja rotación de inventarios",
            selectedEmpresa.riesgo === 'Alto' ? "Flujo de caja negativo últimos 3 meses" : ""
          ].filter(a => a !== ""),
          comparativaSector: {
            ROA: (Math.random() * 10).toFixed(2),
            ROE: (Math.random() * 15).toFixed(2),
            margenNeto: (Math.random() * 20).toFixed(2)
          },
          proyecciones: Array(6).fill(0).map((_, i) => ({
            mes: `Mes ${i + 1}`,
            ventas: Math.random() * 1000000,
            gastos: Math.random() * 800000
          }))
        };
        setFinancialData(mockFinancialData);
        setIsLoading(false);
      }, 800);
    }
  }, [selectedEmpresa]);
  // Gráfico
  useEffect(() => {
    if (financialData && activeSection === 'analisis' && chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: selectedEmpresa?.nombre || 'Empresa',
            data: financialData.tendencia,
            borderColor: '#4e73df',
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            pointRadius: 3,
            pointBackgroundColor: '#4e73df',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [financialData, activeSection, selectedEmpresa]);
  // Funciones auxiliares
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const consultarAI = () => {
    if (!clientQuery.trim()) return;
    setIsLoading(true);
    setAiMessage("Analizando la situación financiera...");
    setTimeout(() => {
      const responses = [
        `Recomendaciones para ${selectedEmpresa.nombre}: \n• Mejorar ROA\n• Optimizar inventario\n• Reducir costos operativos`,
        `Análisis estratégico para ${selectedEmpresa.nombre}:\n• Fortalecer liquidez\n• Revisar estructura de capital\n• Planificar flujo de caja`
      ];
      setAiMessage(responses[Math.floor(Math.random() * responses.length)]);
      setIsLoading(false);
    }, 2500);
  };
  const generateReport = (type) => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Reporte de ${type} generado exitosamente`);
      setIsLoading(false);
      setNotifications([{
        id: notifications.length + 1,
        title: `Reporte generado`,
        message: `El reporte de ${type} para ${selectedEmpresa.nombre} está listo.`,
        date: new Date().toISOString().split('T')[0],
        read: false
      }, ...notifications]);
    }, 1500);
  };
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };
  const filteredCompanies = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="gestion-container">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        selectedEmpresa={selectedEmpresa}
        setShowAIAssistant={setShowAIAssistant}
        handleLogout={handleLogout}
        user={user}
      />
      {/* Main Content */}
      <div className="main-content">
        <Header
          activeSection={activeSection}
          selectedEmpresa={selectedEmpresa}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          markNotificationAsRead={markNotificationAsRead}
          user={user}
        />
        <div className="content-area">
          {isLoading && <LoadingOverlay />}
          {activeSection === 'dashboard' && (
            <Dashboard
              user={user}
              empresas={empresas}
              setShowAIAssistant={setShowAIAssistant}
            />
          )}
          {activeSection === 'clientes' && (
            <Clientes
              empresas={filteredCompanies}
              selectedEmpresa={selectedEmpresa}
              setSelectedEmpresa={setSelectedEmpresa}
              setActiveSection={setActiveSection}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          )}
          {activeSection === 'analisis' && selectedEmpresa && financialData && (
            <Analisis
              selectedEmpresa={selectedEmpresa}
              financialData={financialData}
              chartRef={chartRef}
              setActiveSection={setActiveSection}
              setShowAIAssistant={setShowAIAssistant}
            />
          )}
          {activeSection === 'reportes' && (
            <Reportes
              selectedEmpresa={selectedEmpresa}
              setActiveSection={setActiveSection}
              generateReport={generateReport}
              reportSettings={reportSettings}
              setReportSettings={setReportSettings}
            />
          )}
          {activeSection === 'configuracion' && (
            <Configuracion user={user} />
          )}
        </div>
      </div>
      {/* Asistente IA */}
      {showAIAssistant && (
        <AIAssistant
          show={showAIAssistant}
          onClose={() => {
            setShowAIAssistant(false);
            setAiMessage('');
            setClientQuery('');
          }}
          aiMessage={aiMessage}
          clientQuery={clientQuery}
          setClientQuery={setClientQuery}
          isLoading={isLoading}
          consultarAI={consultarAI}
        />
      )}
    </div>
  );
};
export default Gestion;