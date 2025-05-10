// src/components/layout/Sidebar.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBuilding,
  faChartLine,
  faFileAlt,
  faCog,
  faRobot,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activeSection, setActiveSection, user, setShowAIAssistant, handleLogout }) => (
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
        onClick={() => activeSection !== 'analisis' && setActiveSection('analisis')}
        /* disabled={!selectedEmpresa} */
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
);

export default Sidebar;