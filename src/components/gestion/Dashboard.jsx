// src/components/gestion/Dashboard.jsx
import React from 'react';

const Dashboard = ({ user, empresas, selectedEmpresa, isLoading, setShowAIAssistant }) => {
  const activeCompanies = empresas.filter(e => e.estado === 'Activo').length;
  const lowRiskClients = empresas.filter(e => e.riesgo === 'Bajo').length;
  const highRiskClients = empresas.filter(e => e.riesgo === 'Alto').length;

  return (
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
          <i className="fas fa-lightbulb"></i>
          <span>Obtener recomendaciones IA</span>
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <h3>Clientes Activos</h3>
          <p>{activeCompanies}</p>
          <div className="stat-trend up">+2 este mes</div>
        </div>
        <div className="stat-card success">
          <h3>Clientes Estables</h3>
          <p>{lowRiskClients}</p>
          <div className="stat-trend up">+5%</div>
        </div>
        <div className="stat-card warning">
          <h3>Clientes en Riesgo</h3>
          <p>{highRiskClients}</p>
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
            <button className="analyze-btn">Ejecutar Análisis</button>
          </div>
          <div className="quick-tips">
            <h4>Consejo del día</h4>
            <p>Recuerda revisar los indicadores de liquidez con mayor frecuencia durante temporadas de alta demanda para anticipar necesidades de capital de trabajo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;