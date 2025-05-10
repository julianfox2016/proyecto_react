// src/components/gestion/Clientes.jsx
import React from 'react';

const Clientes = ({ empresas, selectedEmpresa, setSelectedEmpresa, setActiveSection, searchTerm, setSearchTerm }) => {
  const filteredCompanies = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empresa.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="clientes-section">
      <div className="section-header">
        <h2>Mis Clientes</h2>
        <div className="client-actions">
          <button className="add-client-btn">
            <i className="fas fa-plus"></i>
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
              <i className="fas fa-plus"></i>
              <span>Agregar Nuevo Cliente</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clientes;