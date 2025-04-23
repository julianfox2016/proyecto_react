import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Credenciales.css';

const Credenciales = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Nombre de usuario requerido';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Mínimo 4 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Correo electrónico requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo no válido';
    }

    if (!formData.password) {
      newErrors.password = 'Contraseña requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Aquí iría la conexión con tu backend o sistema de autenticación
      // Ejemplo simulado:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Credenciales creadas exitosamente');
      navigate('/gestion'); // Redirige a la página de gestión
    } catch (error) {
      alert('Error al crear credenciales: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="credentials-page">
      <div className="credentials-box">
        <h2>Crear Credenciales</h2>
        <div className="credentials-container">
          <form id="credentialsForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                className={`input ${errors.username ? 'input-error' : ''}`}
                placeholder="Ej. JuanPerez"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <div className="error-message">{errors.username}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className={`input ${errors.email ? 'input-error' : ''}`}
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className={`input ${errors.password ? 'input-error' : ''}`}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={isSubmitting ? 'submitting' : ''}
            >
              {isSubmitting ? 'Creando...' : 'Crear Credenciales'}
            </button>
          </form>
          
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Credenciales;