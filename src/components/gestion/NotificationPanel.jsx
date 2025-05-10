// src/components/gestion/NotificationPanel.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationPanel = ({
  notifications,
  showNotifications,
  setShowNotifications,
  markNotificationAsRead
}) => (
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
);

export default NotificationPanel;