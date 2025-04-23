// src/components/AIAssistantModal.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faChartLine, faLightbulb, faDownload } from '@fortawesome/free-solid-svg-icons';

const AIAssistantModal = ({ onClose, selectedEmpresa }) => {
  const [clientQuery, setClientQuery] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulación de datos financieros
  const mockFinancialData = selectedEmpresa
    ? {
        ROA: (Math.random() * 10).toFixed(2),
        ROE: (Math.random() * 15).toFixed(2),
        margenNeto: (Math.random() * 20).toFixed(2),
        liquidez: (Math.random() * 5).toFixed(2),
        endeudamiento: (Math.random() * 100).toFixed(2),
        rotacionInventario: (Math.random() * 12).toFixed(2),
      }
    : null;

  // Función para generar recomendaciones basadas en datos
  const generateRecommendations = () => {
    if (!mockFinancialData) return '';

    const recommendations = [];
    if (mockFinancialData.ROA < 5) {
      recommendations.push('El ROA está por debajo del promedio sectorial. Considera mejorar la eficiencia operativa.');
    }
    if (mockFinancialData.ROE < 10) {
      recommendations.push(
        'El ROE es bajo. Evalúa estrategias para aumentar la rentabilidad sobre el capital invertido.'
      );
    }
    if (mockFinancialData.liquidez < 1.5) {
      recommendations.push('La liquidez es baja. Aumenta los activos líquidos para mejorar la solvencia.');
    }
    if (mockFinancialData.endeudamiento > 70) {
      recommendations.push('El nivel de endeudamiento es alto. Considera reducir la deuda a corto plazo.');
    }
    if (mockFinancialData.rotacionInventario < 6) {
      recommendations.push('La rotación de inventarios es baja. Optimiza la gestión de inventario.');
    }

    return recommendations.length > 0 ? recommendations.join('\n') : 'No se detectaron áreas críticas.';
  };

  // Consulta al asistente IA
  const consultarAI = () => {
    if (!clientQuery.trim()) return;

    setIsLoading(true);
    setAiMessage('Analizando la situación financiera...');

    setTimeout(() => {
      let response = '';

      // Análisis específico basado en la consulta
      if (clientQuery.toLowerCase().includes('roe')) {
        response = `Análisis del ROE para ${selectedEmpresa?.nombre || 'tu cliente'}:
          - Valor actual: ${mockFinancialData.ROE}%
          - Recomendación: ${
            mockFinancialData.ROE > 10
              ? 'El ROE es saludable. Mantén las estrategias actuales.'
              : 'Considera mejorar la rentabilidad sobre el capital.'
          }`;
      } else if (clientQuery.toLowerCase().includes('liquidez')) {
        response = `Análisis de liquidez para ${selectedEmpresa?.nombre || 'tu cliente'}:
          - Valor actual: ${mockFinancialData.liquidez}
          - Recomendación: ${
            mockFinancialData.liquidez > 2
              ? 'La posición de liquidez es sólida.'
              : 'Aumenta los activos líquidos para mejorar la solvencia.'
          }`;
      } else if (clientQuery.toLowerCase().includes('endeudamiento')) {
        response = `Análisis de endeudamiento para ${selectedEmpresa?.nombre || 'tu cliente'}:
          - Nivel actual: ${mockFinancialData.endeudamiento}%
          - Recomendación: ${
            mockFinancialData.endeudamiento > 70
              ? 'Reduce la deuda a corto plazo.'
              : 'El nivel de endeudamiento es manejable.'
          }`;
      } else {
        // Análisis general
        response = `Análisis general para ${selectedEmpresa?.nombre || 'tu cliente'}:
          - ROA: ${mockFinancialData.ROA}% (${mockFinancialData.ROA > 5 ? 'Bueno' : 'Mejorable'})
          - ROE: ${mockFinancialData.ROE}% (${mockFinancialData.ROE > 10 ? 'Saludable' : 'Bajo'})
          - Liquidez: ${mockFinancialData.liquidez} (${mockFinancialData.liquidez > 1.5 ? 'Sólida' : 'Precaución'})
          - Endeudamiento: ${mockFinancialData.endeudamiento}%
          - Rotación de inventario: ${mockFinancialData.rotacionInventario} veces/año
          
          Recomendaciones clave:
          ${generateRecommendations()}
        `;
      }

      setAiMessage(response);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="ai-assistant-modal">
      <div className="ai-assistant-content">
        {/* Encabezado */}
        <div className="ai-header">
          <div className="ai-title">
            <FontAwesomeIcon icon={faRobot} />
            <h3>Asistente Financiero IA</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Contenido */}
        <div className="ai-message-container">
          {isLoading ? (
            <div className="ai-loading">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p>{aiMessage}</p>
            </div>
          ) : aiMessage ? (
            <div className="ai-response">
              <div className="response-header">
                <strong>Recomendaciones para {selectedEmpresa?.nombre || 'tu cliente'}</strong>
              </div>
              <div className="response-content">
                {aiMessage.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <button className="download-report-btn" onClick={() => alert('Descargando reporte...')}>
                <FontAwesomeIcon icon={faDownload} />
                <span>Descargar análisis</span>
              </button>
            </div>
          ) : (
            <div className="ai-welcome">
              <p>¡Hola! Soy tu asistente de análisis financiero. ¿Sobre qué necesitas asesoramiento hoy?</p>
              <div className="quick-questions">
                <button onClick={() => setClientQuery('¿Cómo puedo mejorar el ROE de mi cliente?')}>
                  <FontAwesomeIcon icon={faChartLine} /> ¿Cómo mejorar el ROE?
                </button>
                <button onClick={() => setClientQuery('¿Qué estrategias recomiendas para reducir el endeudamiento?')}>
                  <FontAwesomeIcon icon={faChartLine} /> Reducción de endeudamiento
                </button>
                <button onClick={() => setClientQuery('Análisis de la situación financiera actual')}>
                  <FontAwesomeIcon icon={faLightbulb} /> Análisis general
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Entrada de Consulta */}
        <div className="ai-input-container">
          <textarea
            placeholder="Describe la situación o pregunta que tienes..."
            value={clientQuery}
            onChange={(e) => setClientQuery(e.target.value)}
            disabled={isLoading}
          ></textarea>
          <button onClick={consultarAI} disabled={!clientQuery.trim() || isLoading}>
            {isLoading ? 'Procesando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantModal;