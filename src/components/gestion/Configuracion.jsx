// src/components/gestion/Configuracion.jsx
import React from 'react';

const Configuracion = ({ user }) => {
  return (
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
  );
};

export default Configuracion;