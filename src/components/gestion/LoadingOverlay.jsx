// src/components/gestion/LoadingOverlay.jsx
import React from 'react';

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Cargando datos...</p>
    </div>
  );
};

export default LoadingOverlay;