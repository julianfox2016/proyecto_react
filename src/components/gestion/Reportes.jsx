// src/components/gestion/Reportes.jsx
import React from 'react';

const Reportes = ({ 
  selectedEmpresa, 
  setSelectedEmpresa, 
  setActiveSection, 
  generateReport 
}) => {
  return (
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
                <i className="fas fa-download"></i>
                <span>Generar</span>
              </button>
            </div>
            <div className="report-card" onClick={() => generateReport('Liquidez')}>
              <div className="report-icon liquidez"></div>
              <h3>Reporte de Liquidez</h3>
              <p>Ratios de solvencia y flujo de caja</p>
              <button className="generate-btn">
                <i className="fas fa-download"></i>
                <span>Generar</span>
              </button>
            </div>
            <div className="report-card" onClick={() => generateReport('Endeudamiento')}>
              <div className="report-icon endeudamiento"></div>
              <h3>Reporte de Endeudamiento</h3>
              <p>Estructura de capital y capacidad de deuda</p>
              <button className="generate-btn">
                <i className="fas fa-download"></i>
                <span>Generar</span>
              </button>
            </div>
            <div className="report-card" onClick={() => generateReport('Completo')}>
              <div className="report-icon completo"></div>
              <h3>Reporte Completo</h3>
              <p>Todos los indicadores financieros clave</p>
              <button className="generate-btn">
                <i className="fas fa-download"></i>
                <span>Generar</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reportes;