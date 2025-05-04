import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthService } from '../services/useAuthService';
import './RegistroUsuario.css';

const RegistroUsuario = () => {
  const { loginUser } = useAuthService();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeForm, setActiveForm] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleForms = () => setActiveForm(activeForm === 'login' ? 'register' : 'login');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(loginEmail) || !validatePassword(loginPassword)) {
      setErrorMessage('Correo o contraseña inválidos.');
      return;
    }

    try {
      const response = await loginUser(loginEmail, loginPassword);

      if (response.success) {// pregunta si el success es true
        login(); // 👈 SIN parámetros
        navigate('/gestion');
      } else {
        setErrorMessage('Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error en el servidor. Intenta de nuevo.');
    }
  };

  return (
    <div className="form-box">
      <h2 className="title">Bienvenido</h2>
      <p className="subtitle">Por favor, inicia sesión o regístrate</p>

      <div id="loginContainer" className={`form-container ${activeForm === 'login' ? 'active' : ''}`}>
        <form id="loginForm" className="form" onSubmit={handleLoginSubmit}>
          <input 
            type="email" 
            id="loginEmail" 
            className="input" 
            placeholder="Email" 
            required
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input 
            type="password" 
            id="loginPassword" 
            className="input" 
            placeholder="Contraseña" 
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          <button type="submit">Iniciar Sesión</button>
          <div className="forgot-password">
            <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
        <div className="toggle-section">
          <p>¿No tienes una cuenta? <Link to="#" onClick={toggleForms}>Regístrate</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegistroUsuario;