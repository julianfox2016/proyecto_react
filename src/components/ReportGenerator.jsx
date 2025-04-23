import React from 'react';

const ReportGenerator = ({ generateReport, selectedEmpresa }) => {
  return (
    <div className="report-generator">
      <h2>Generador de Reportes</h2>
      <button onClick={() => generateReport('Completo')}>Generar Reporte Completo</button>
      {selectedEmpresa && <p>Cliente seleccionado: {selectedEmpresa.nombre}</p>}
    </div>
  );
};

export default ReportGenerator;