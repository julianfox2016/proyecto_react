// src/components/gestion/AIAssistant.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

const AIAssistant = ({ show, onClose, aiMessage, clientQuery, setClientQuery, consultarAI, isLoading }) => {
  if (!show) return null;

  return (
    <div className="ai-assistant-modal">
      <div className="ai-assistant-content">
        <div className="ai-header">
          <div className="ai-title">
            <FontAwesomeIcon icon={faRobot} />
            <h3>Asistente Financiero IA</h3>
          </div>
          <button 
            className="close-btn"
            onClick={onClose}
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
  );
};

export default AIAssistant;