import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Gestion.css';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt, 
  faChartLine, 
  faBuilding, 
  faFileAlt, 
  faHome,
  faRobot,
  faBell,
  faSearch,
  faPlus,
  faDownload,
  faLightbulb,
  faCog
} from '@fortawesome/free-solid-svg-icons';

const Gestion = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
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
    includeComments: true
  });
  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Datos de ejemplo mejorados
  useEffect(() => {
    setIsLoading(true);
    
    // Simulación de API call
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
      
      // Notificaciones simuladas
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

  // Cargar datos financieros cuando se selecciona una empresa
  useEffect(() => {
    if (selectedEmpresa) {
      setIsLoading(true);
      
      // Simulación de API call
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
            mes: `Mes ${i+1}`,
            ventas: Math.random() * 1000000,
            gastos: Math.random() * 800000
          }))
        };
        
        setFinancialData(mockFinancialData);
        setIsLoading(false);
      }, 800);
    }
  }, [selectedEmpresa]);

  // Configurar gráficos
  useEffect(() => {
    if (financialData && activeSection === 'analisis' && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
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
            pointBorderColor: '#4e73df',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#4e73df',
            pointHoverBorderColor: '#4e73df',
            pointHitRadius: 10,
            pointBorderWidth: 2,
            tension: 0.3,
            fill: true
          },
          {
            label: 'Promedio sector',
            data: Array(12).fill(0).map(() => Math.random() * 100),
            borderColor: '#1cc88a',
            backgroundColor: 'rgba(28, 200, 138, 0.05)',
            borderDash: [5, 5],
            pointRadius: 0,
            tension: 0.3
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Puntuación (0-100)'
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          }
        }
      });
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [financialData, activeSection, selectedEmpresa]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const consultarAI = () => {
    if (!clientQuery.trim()) return;
    
    setIsLoading(true);
    setAiMessage("Analizando la situación financiera...");
    
    // Simulación de consulta a IA con respuestas más elaboradas
    setTimeout(() => {
      const responses = [
        `Para ${selectedEmpresa?.nombre || 'tu cliente'}, mi análisis indica:\n\n1. El ROA de ${financialData?.indicadores?.ROA || 'N/A'}% está ${financialData?.indicadores?.ROA > financialData?.comparativaSector?.ROA ? 'por encima' : 'por debajo'} del promedio sectorial (${financialData?.comparativaSector?.ROA || 'N/A'}%)\n\n2. Recomiendo ${financialData?.indicadores?.endeudamiento > 60 ? 'reducir el endeudamiento a corto plazo' : 'mantener la estructura de capital actual'}\n\n3. La rotación de inventarios podría optimizarse con un sistema de gestión más eficiente.`,
        `Análisis estratégico para ${selectedEmpresa?.nombre || 'tu cliente'}:\n\n• Ventaja competitiva: ${financialData?.indicadores?.margenNeto > financialData?.comparativaSector?.margenNeto ? 'márgenes superiores al sector' : 'necesidad de mejorar eficiencia operativa'}\n\n• Recomendación clave: ${financialData?.indicadores?.liquidez < 1.5 ? 'aumentar activos líquidos para mejorar solvencia' : 'la posición de liquidez es adecuada'}\n\n• Oportunidad: desarrollar estrategias para ${financialData?.indicadores?.ROE > financialData?.comparativaSector?.ROE ? 'aprovechar el buen retorno sobre capital' : 'mejorar la rentabilidad para los accionistas'}`,
        `Plan de acción para ${selectedEmpresa?.nombre || 'tu cliente'}:\n\n1. Optimización de costos: Identificar 3 áreas con mayor gasto operativo\n2. Estrategia de crecimiento: ${financialData?.indicadores?.margenNeto > 15 ? 'inversión en expansión' : 'enfoque en rentabilidad antes de crecer'}\n3. Gestión de riesgo: ${selectedEmpresa?.riesgo === 'Alto' ? 'implementar plan de contingencia financiera' : 'monitorear indicadores clave mensualmente'}\n\nPrioridad: ${financialData?.alertas?.length > 0 ? 'abordar ' + financialData.alertas[0] : 'mantener estrategia actual'}`
      ];
      
      setAiMessage(responses[Math.floor(Math.random() * responses.length)]);
      setIsLoading(false);
    }, 2500);
  };

  const generateReport = (type) => {
    setIsLoading(true);
    // Simulación de generación de reporte
    setTimeout(() => {
      alert(`Reporte de ${type} generado exitosamente para ${selectedEmpresa?.nombre || 'la empresa seleccionada'}`);
      setIsLoading(false);
      
      // Agregar notificación
      const newNotification = {
        id: notifications.length + 1,
        title: `Reporte generado`,
        message: `El reporte de ${type} para ${selectedEmpresa?.nombre || 'la empresa'} está listo para descargar`,
        date: new Date().toISOString().split('T')[0],
        read: false
      };
      
      setNotifications([newNotification, ...notifications]);
    }, 1500);
  };

  const filteredCompanies = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  return (
    <div className="gestion-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>FinanzasPro</h2>
          <p className="user-info">{user?.name || 'Asesor'} <span>• {user?.role || 'Experto'}</span></p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveSection('dashboard')}
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Dashboard</span>
          </button>
          <button 
            className={activeSection === 'clientes' ? 'active' : ''}
            onClick={() => setActiveSection('clientes')}
          >
            <FontAwesomeIcon icon={faBuilding} />
            <span>Mis Clientes</span>
          </button>
          <button 
            className={activeSection === 'analisis' ? 'active' : ''}
            onClick={() => setActiveSection('analisis')}
            disabled={!selectedEmpresa}
          >
            <FontAwesomeIcon icon={faChartLine} />
            <span>Análisis</span>
          </button>
          <button 
            className={activeSection === 'reportes' ? 'active' : ''}
            onClick={() => setActiveSection('reportes')}
          >
            <FontAwesomeIcon icon={faFileAlt} />
            <span>Reportes</span>
          </button>
          <button 
            className={activeSection === 'configuracion' ? 'active' : ''}
            onClick={() => setActiveSection('configuracion')}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Configuración</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="ai-assistant-btn" onClick={() => setShowAIAssistant(true)}>
            <FontAwesomeIcon icon={faRobot} />
            <span>Asistente IA</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="main-header">
          <h1>
            {activeSection === 'dashboard' && 'Panel de Control'}
            {activeSection === 'clientes' && 'Gestión de Clientes'}
            {activeSection === 'analisis' && `Análisis Financiero${selectedEmpresa ? `: ${selectedEmpresa.nombre}` : ''}`}
            {activeSection === 'reportes' && 'Generador de Reportes'}
            {activeSection === 'configuracion' && 'Configuración'}
          </h1>
          
          <div className="header-actions">
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="notifications">
              <button 
                className={`notification-btn ${notifications.some(n => !n.read) ? 'has-unread' : ''}`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FontAwesomeIcon icon={faBell} />
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notificaciones</h4>
                    <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}>
                      Marcar todas como leídas
                    </button>
                  </div>
                  
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map(notif => (
                        <li 
                          key={notif.id} 
                          className={!notif.read ? 'unread' : ''}
                          onClick={() => markNotificationAsRead(notif.id)}
                        >
                          <div className="notification-title">{notif.title}</div>
                          <div className="notification-message">{notif.message}</div>
                          <div className="notification-date">{notif.date}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="empty-notifications">No hay notificaciones nuevas</div>
                  )}
                </div>
              )}
            </div>
            
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        
        <div className="content-area">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Cargando datos...</p>
            </div>
          )}
          
          {activeSection === 'dashboard' && (
            <div className="dashboard">
              <div className="welcome-banner">
                <div className="welcome-text">
                  <h2>Bienvenido, {user?.name || 'Asesor'}</h2>
                  <p>Aquí tienes un resumen de tu actividad reciente y los indicadores clave</p>
                </div>
                <button 
                  className="quick-action-btn"
                  onClick={() => setShowAIAssistant(true)}
                >
                  <FontAwesomeIcon icon={faLightbulb} />
                  <span>Obtener recomendaciones IA</span>
                </button>
              </div>
              
              <div className="stats-grid">
                <div className="stat-card primary">
                  <h3>Clientes Activos</h3>
                  <p>{empresas.filter(e => e.estado === 'Activo').length}</p>
                  <div className="stat-trend up">+2 este mes</div>
                </div>
                <div className="stat-card success">
                  <h3>Clientes Estables</h3>
                  <p>{empresas.filter(e => e.riesgo === 'Bajo').length}</p>
                  <div className="stat-trend up">+5%</div>
                </div>
                <div className="stat-card warning">
                  <h3>Clientes en Riesgo</h3>
                  <p>{empresas.filter(e => e.riesgo === 'Alto').length}</p>
                  <div className="stat-trend down">-1 este mes</div>
                </div>
                <div className="stat-card info">
                  <h3>Reportes Generados</h3>
                  <p>24</p>
                  <div className="stat-trend up">+8 este mes</div>
                </div>
              </div>
              
              <div className="dashboard-row">
                <div className="recent-activity">
                  <h3>Actividad Reciente</h3>
                  <ul>
                    <li>
                      <div className="activity-icon analysis"></div>
                      <div className="activity-details">
                        <p>Análisis completado para TechCorp</p>
                        <span>Hoy, 10:45 AM</span>
                      </div>
                    </li>
                    <li>
                      <div className="activity-icon report"></div>
                      <div className="activity-details">
                        <p>Reporte generado para FoodPlus</p>
                        <span>Ayer, 3:30 PM</span>
                      </div>
                    </li>
                    <li>
                      <div className="activity-icon meeting"></div>
                      <div className="activity-details">
                        <p>Reunión programada con BuildMaster</p>
                        <span>15 Nov, 9:00 AM</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="quick-analysis">
                  <h3>Análisis Rápido</h3>
                  <div className="analysis-form">
                    <select>
                      <option value="">Seleccionar cliente</option>
                      {empresas.map(empresa => (
                        <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
                      ))}
                    </select>
                    <select>
                      <option value="">Tipo de análisis</option>
                      <option value="rentabilidad">Rentabilidad</option>
                      <option value="liquidez">Liquidez</option>
                      <option value="endeudamiento">Endeudamiento</option>
                    </select>
                    <button className="analyze-btn">
                      Ejecutar Análisis
                    </button>
                  </div>
                  <div className="quick-tips">
                    <h4>Consejo del día</h4>
                    <p>Recuerda revisar los indicadores de liquidez con mayor frecuencia durante temporadas de alta demanda para anticipar necesidades de capital de trabajo.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'clientes' && (
            <div className="clientes-section">
              <div className="section-header">
                <h2>Mis Clientes</h2>
                <div className="client-actions">
                  <button className="add-client-btn">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Agregar Cliente</span>
                  </button>
                </div>
              </div>
              
              <div className="client-filters">
                <div className="filter-group">
                  <label>Filtrar por:</label>
                  <select>
                    <option value="all">Todos los clientes</option>
                    <option value="active">Activos</option>
                    <option value="high-risk">Alto riesgo</option>
                    <option value="by-sector">Por sector</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Ordenar por:</label>
                  <select>
                    <option value="recent">Más recientes</option>
                    <option value="name">Nombre</option>
                    <option value="risk">Nivel de riesgo</option>
                  </select>
                </div>
              </div>
              
              <div className="clientes-grid">
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map(empresa => (
                    <div 
                      key={empresa.id} 
                      className={`client-card ${empresa.riesgo.toLowerCase()}`}
                      onClick={() => {
                        setSelectedEmpresa(empresa);
                        setActiveSection('analisis');
                      }}
                    >
                      <div className="client-logo">
                        {empresa.nombre.charAt(0)}
                      </div>
                      <div className="client-info">
                        <h3>{empresa.nombre}</h3>
                        <p className="sector">{empresa.sector}</p>
                        <div className="client-meta">
                          <span className={`status ${empresa.estado.replace(' ', '-').toLowerCase()}`}>
                            {empresa.estado}
                          </span>
                          <span className={`risk ${empresa.riesgo.toLowerCase()}`}>
                            {empresa.riesgo}
                          </span>
                        </div>
                      </div>
                      <div className="client-actions">
                        <button 
                          className="action-btn analyze"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEmpresa(empresa);
                            setActiveSection('analisis');
                          }}
                        >
                          Analizar
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <p>No se encontraron clientes que coincidan con la búsqueda</p>
                    <button className="add-client-btn">
                      <FontAwesomeIcon icon={faPlus} />
                      <span>Agregar Nuevo Cliente</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'analisis' && selectedEmpresa && financialData && (
            <div className="analisis-section">
              <div className="analisis-header">
                <div className="company-header">
                  <div className="company-logo">
                    {selectedEmpresa.nombre.charAt(0)}
                  </div>
                  <div>
                    <h2>{selectedEmpresa.nombre}</h2>
                    <p className="company-sector">{selectedEmpresa.sector} • {selectedEmpresa.estado}</p>
                  </div>
                </div>
                
                <div className="analisis-actions">
                  <button 
                    className="generate-report-btn"
                    onClick={() => setActiveSection('reportes')}
                  >
                    <FontAwesomeIcon icon={faFileAlt} />
                    <span>Generar Reporte</span>
                  </button>
                  <button 
                    className="ai-assistant-btn"
                    onClick={() => setShowAIAssistant(true)}
                  >
                    <FontAwesomeIcon icon={faRobot} />
                    <span>Asistente IA</span>
                  </button>
                </div>
              </div>
              
              <div className="analisis-tabs">
                <button className="active">Resumen</button>
                <button>Indicadores</button>
                <button>Tendencias</button>
                <button>Proyecciones</button>
                <button>Comparativa</button>
              </div>
              
              <div className="indicadores-grid">
                <div className="indicador-card">
                  <h3>ROA</h3>
                  <p>{financialData.indicadores.ROA}%</p>
                  <div className="comparison">
                    <span className={`trend ${parseFloat(financialData.indicadores.ROA) > parseFloat(financialData.comparativaSector.ROA) ? 'up' : 'down'}`}>
                      {parseFloat(financialData.indicadores.ROA) > parseFloat(financialData.comparativaSector.ROA) ? '↑' : '↓'} 
                      {Math.abs(parseFloat(financialData.indicadores.ROA) - parseFloat(financialData.comparativaSector.ROA)).toFixed(2)}% vs sector
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(parseFloat(financialData.indicadores.ROA) / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="indicador-card">
                  <h3>ROE</h3>
                  <p>{financialData.indicadores.ROE}%</p>
                  <div className="comparison">
                    <span className={`trend ${parseFloat(financialData.indicadores.ROE) > parseFloat(financialData.comparativaSector.ROE) ? 'up' : 'down'}`}>
                      {parseFloat(financialData.indicadores.ROE) > parseFloat(financialData.comparativaSector.ROE) ? '↑' : '↓'} 
                      {Math.abs(parseFloat(financialData.indicadores.ROE) - parseFloat(financialData.comparativaSector.ROE)).toFixed(2)}% vs sector
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(parseFloat(financialData.indicadores.ROE) / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="indicador-card">
                  <h3>Margen Neto</h3>
                  <p>{financialData.indicadores.margenNeto}%</p>
                  <div className="comparison">
                    <span className={`trend ${parseFloat(financialData.indicadores.margenNeto) > parseFloat(financialData.comparativaSector.margenNeto) ? 'up' : 'down'}`}>
                      {parseFloat(financialData.indicadores.margenNeto) > parseFloat(financialData.comparativaSector.margenNeto) ? '↑' : '↓'} 
                      {Math.abs(parseFloat(financialData.indicadores.margenNeto) - parseFloat(financialData.comparativaSector.margenNeto)).toFixed(2)}% vs sector
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(parseFloat(financialData.indicadores.margenNeto) / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="indicador-card">
                  <h3>Liquidez</h3>
                  <p>{financialData.indicadores.liquidez}</p>
                  <div className="evaluation">
                    <span className={`rating ${financialData.indicadores.liquidez > 2 ? 'excellent' : financialData.indicadores.liquidez > 1 ? 'good' : 'poor'}`}>
                      {financialData.indicadores.liquidez > 2 ? 'Excelente' : financialData.indicadores.liquidez > 1 ? 'Adecuada' : 'Precaución'}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(parseFloat(financialData.indicadores.liquidez) / 3) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="chart-container">
                <canvas ref={chartRef} height="300"></canvas>
              </div>
              
              <div className="alertas-section">
                <h3>Alertas y Recomendaciones</h3>
                {financialData.alertas.length > 0 ? (
                  <ul>
                    {financialData.alertas.map((alerta, index) => (
                      <li key={index}>
                        <div className="alert-icon"></div>
                        <div className="alert-content">
                          <p>{alerta}</p>
                          <button className="solution-btn">Ver posibles soluciones</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="no-alerts">
                    <p>No hay alertas críticas para esta empresa</p>
                  </div>
                )}
              </div>
              
              <div className="projections-section">
                <h3>Proyecciones Financieras</h3>
                <div className="projections-grid">
                  {financialData.proyecciones.map((proyeccion, index) => (
                    <div key={index} className="projection-card">
                      <h4>{proyeccion.mes}</h4>
                      <div className="projection-data">
                        <div>
                          <span>Ventas</span>
                          <p>${(proyeccion.ventas / 1000).toFixed(1)}K</p>
                        </div>
                        <div>
                          <span>Gastos</span>
                          <p>${(proyeccion.gastos / 1000).toFixed(1)}K</p>
                        </div>
                        <div>
                          <span>Utilidad</span>
                          <p className={`profit ${(proyeccion.ventas - proyeccion.gastos) > 0 ? 'positive' : 'negative'}`}>
                            ${((proyeccion.ventas - proyeccion.gastos) / 1000).toFixed(1)}K
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'reportes' && (
            <div className="reportes-section">
              <div className="section-header">
                <h2>Generador de Reportes</h2>
                {selectedEmpresa && (
                  <div className="current-client">
                    <span>Cliente actual:</span>
                    <div className="client-badge">
                      {selectedEmpresa.nombre}
                      <button onClick={() => setSelectedEmpresa(null)}>Cambiar</button>
                    </div>
                  </div>
                )}
              </div>
              
              {!selectedEmpresa ? (
                <div className="select-client-prompt">
                  <p>Selecciona un cliente para generar reportes</p>
                  <button 
                    className="select-client-btn"
                    onClick={() => setActiveSection('clientes')}
                  >
                    Seleccionar Cliente
                  </button>
                </div>
              ) : (
                <>
                  <div className="report-types">
                    <div className="report-card" onClick={() => generateReport('Rentabilidad')}>
                      <div className="report-icon rentabilidad"></div>
                      <h3>Reporte de Rentabilidad</h3>
                      <p>Análisis de márgenes, ROA y ROE</p>
                      <button className="generate-btn">
                        <FontAwesomeIcon icon={faDownload} />
                        <span>Generar</span>
                      </button>
                    </div>
                    
                    <div className="report-card" onClick={() => generateReport('Liquidez')}>
                      <div className="report-icon liquidez"></div>
                      <h3>Reporte de Liquidez</h3>
                      <p>Ratios de solvencia y flujo de caja</p>
                      <button className="generate-btn">
                        <FontAwesomeIcon icon={faDownload} />
                        <span>Generar</span>
                      </button>
                    </div>
                    
                    <div className="report-card" onClick={() => generateReport('Endeudamiento')}>
                      <div className="report-icon endeudamiento"></div>
                      <h3>Reporte de Endeudamiento</h3>
                      <p>Estructura de capital y capacidad de deuda</p>
                      <button className="generate-btn">
                        <FontAwesomeIcon icon={faDownload} />
                        <span>Generar</span>
                      </button>
                    </div>
                    
                    <div className="report-card" onClick={() => generateReport('Completo')}>
                      <div className="report-icon completo"></div>
                      <h3>Reporte Completo</h3>
                      <p>Todos los indicadores financieros clave</p>
                      <button className="generate-btn">
                        <FontAwesomeIcon icon={faDownload} />
                        <span>Generar</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="report-settings">
                    <h3>Configuración del Reporte</h3>
                    <div className="settings-grid">
                      <div className="setting-group">
                        <label>Formato</label>
                        <select 
                          value={reportSettings.format}
                          onChange={(e) => setReportSettings({...reportSettings, format: e.target.value})}
                        >
                          <option value="pdf">PDF</option>
                          <option value="excel">Excel</option>
                          <option value="powerpoint">PowerPoint</option>
                        </select>
                      </div>
                      
                      <div className="setting-group">
                        <label>Indicadores a incluir</label>
                        <div className="checkboxes">
                          {['ROA', 'ROE', 'Liquidez', 'Endeudamiento', 'Margen Neto', 'Rotación Inventario'].map(ind => (
                            <label key={ind}>
                              <input 
                                type="checkbox" 
                                checked={reportSettings.indicators.includes(ind)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setReportSettings({
                                      ...reportSettings,
                                      indicators: [...reportSettings.indicators, ind]
                                    });
                                  } else {
                                    setReportSettings({
                                      ...reportSettings,
                                      indicators: reportSettings.indicators.filter(i => i !== ind)
                                    });
                                  }
                                }}
                              />
                              {ind}
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="setting-group">
                        <label>Opciones adicionales</label>
                        <div className="checkboxes">
                          <label>
                            <input 
                              type="checkbox" 
                              checked={reportSettings.includeComments}
                              onChange={(e) => setReportSettings({...reportSettings, includeComments: e.target.checked})}
                            />
                            Incluir comentarios y recomendaciones
                          </label>
                          <label>
                            <input type="checkbox" />
                            Incluir comparativa sectorial
                          </label>
                          <label>
                            <input type="checkbox" />
                            Incluir gráficos y visualizaciones
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeSection === 'configuracion' && (
            <div className="configuracion-section">
              <h2>Configuración</h2>
              
              <div className="settings-tabs">
                <button className="active">Perfil</button>
                <button>Preferencias</button>
                <button>Notificaciones</button>
                <button>Integraciones</button>
              </div>
              
              <div className="profile-settings">
                <div className="avatar-upload">
                  <div className="avatar-preview">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <button className="upload-btn">Cambiar foto</button>
                </div>
                
                <form className="profile-form">
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input type="text" value={user?.name || ''} readOnly />
                  </div>
                  
                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input type="email" value={user?.email || ''} readOnly />
                  </div>
                  
                  <div className="form-group">
                    <label>Especialidad</label>
                    <select>
                      <option>Finanzas Corporativas</option>
                      <option>Análisis de Inversiones</option>
                      <option>Planificación Financiera</option>
                      <option>Riesgos Financieros</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Firma para reportes</label>
                    <textarea placeholder="Ingresa tu firma profesional que aparecerá en los reportes generados"></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="cancel-btn">Cancelar</button>
                    <button type="submit" className="save-btn">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Asistente IA Modal */}
      {showAIAssistant && (
        <div className="ai-assistant-modal">
          <div className="ai-assistant-content">
            <div className="ai-header">
              <div className="ai-title">
                <FontAwesomeIcon icon={faRobot} />
                <h3>Asistente Financiero IA</h3>
              </div>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAIAssistant(false);
                  setAiMessage('');
                  setClientQuery('');
                }}
              >
                ×
              </button>
            </div>
            
            <div className="ai-message-container">
              {isLoading ? (
                <div className="ai-loading">
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <p>Analizando información...</p>
                </div>
              ) : (
                <div className="ai-message">
                  {aiMessage ? (
                    <div className="ai-response">
                      <div className="response-header">
                        <strong>Recomendaciones para {selectedEmpresa?.nombre || 'tu cliente'}</strong>
                      </div>
                      <div className="response-content">
                        {aiMessage.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="ai-welcome">
                      <p>¡Hola! Soy tu asistente de análisis financiero. ¿Sobre qué necesitas asesoramiento hoy?</p>
                      <div className="quick-questions">
                        <button onClick={() => setClientQuery('¿Cómo puedo mejorar el ROE de mi cliente?')}>
                          ¿Cómo mejorar el ROE?
                        </button>
                        <button onClick={() => setClientQuery('¿Qué estrategias recomiendas para reducir el endeudamiento?')}>
                          Reducción de endeudamiento
                        </button>
                        <button onClick={() => setClientQuery('Análisis de la situación financiera actual')}>
                          Análisis general
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="ai-input-container">
              <textarea 
                placeholder="Describe la situación o pregunta que tienes..."
                value={clientQuery}
                onChange={(e) => setClientQuery(e.target.value)}
                disabled={isLoading}
              ></textarea>
              <button 
                onClick={consultarAI}
                disabled={!clientQuery.trim() || isLoading}
              >
                {isLoading ? 'Procesando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gestion;