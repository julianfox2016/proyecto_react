import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Analisis = ({
  selectedEmpresa,
  financialData,
  setActiveSection,
  setShowAIAssistant,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (financialData && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Destruir el gráfico existente antes de crear uno nuevo
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Crear el nuevo gráfico
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
            tension: 0.3,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        },
      });
    }

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [financialData, selectedEmpresa]);

  return (
    <div className="analisis-section">
      <div className="analisis-header">
        <div className="company-header">
          <div className="company-logo">
            {selectedEmpresa?.nombre.charAt(0)}
          </div>
          <div>
            <h2>{selectedEmpresa?.nombre}</h2>
            <p className="company-sector">
              {selectedEmpresa?.sector} • {selectedEmpresa?.estado}
            </p>
          </div>
        </div>
        <div className="analisis-actions">
          <button
            className="generate-report-btn"
            onClick={() => setActiveSection('reportes')}
          >
            <i className="fas fa-file-alt"></i>
            <span>Generar Reporte</span>
          </button>
          <button
            className="ai-assistant-btn"
            onClick={() => setShowAIAssistant(true)}
          >
            <i className="fas fa-robot"></i>
            <span>Asistente IA</span>
          </button>
        </div>
      </div>

      <div className="indicadores-grid">
        <div className="indicador-card">
          <h3>ROA</h3>
          <p>{financialData?.indicadores?.ROA}%</p>
        </div>
        <div className="indicador-card">
          <h3>ROE</h3>
          <p>{financialData?.indicadores?.ROE}%</p>
        </div>
        <div className="indicador-card">
          <h3>Margen Neto</h3>
          <p>{financialData?.indicadores?.margenNeto}%</p>
        </div>
        <div className="indicador-card">
          <h3>Liquidez</h3>
          <p>{financialData?.indicadores?.liquidez}</p>
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
    </div>
  );
};

export default Analisis;
