// src/components/layout/Header.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  activeSection,
  searchTerm,
  setSearchTerm,
  notifications,
  showNotifications,
  setShowNotifications,
  markNotificationAsRead,
  user,
  selectedEmpresa,
}) => (
  <header className="main-header">
    <h1>
      {activeSection === 'dashboard' && 'Panel de Control'}
      {activeSection === 'clientes' && 'Gestión de Clientes'}
      {activeSection === 'analisis' && `Análisis Financiero${selectedEmpresa ? `: ${selectedEmpresa.nombre}` : ''}`}
      {activeSection === 'reportes' && 'Generador de Reportes'}
      {activeSection === 'configuracion' && 'Configuración'}
    </h1>
    <div className="header-actions">
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} />
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="notifications">
        <button 
          className={`notification-btn ${notifications.some(n => !n.read) ? 'has-unread' : ''}`}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FontAwesomeIcon icon={faBell} />
        </button>
        {showNotifications && (
          <div className="notifications-dropdown">
            <div className="notifications-header">
              <h4>Notificaciones</h4>
              <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}>
                Marcar todas como leídas
              </button>
            </div>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map(notif => (
                  <li 
                    key={notif.id} 
                    className={!notif.read ? 'unread' : ''}
                    onClick={() => markNotificationAsRead(notif.id)}
                  >
                    <div className="notification-title">{notif.title}</div>
                    <div className="notification-message">{notif.message}</div>
                    <div className="notification-date">{notif.date}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-notifications">No hay notificaciones nuevas</div>
            )}
          </div>
        )}
      </div>
      <div className="user-avatar">
        {user?.name?.charAt(0) || 'A'}
      </div>
    </div>
  </header>
);

export default Header;