import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './RegistroUsuario.css'

const RegistroUsuario = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  
  const [activeForm, setActiveForm] = useState('login')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [errors, setErrors] = useState({
    loginEmail: false,
    loginPassword: false,
    firstName: false,
    lastName: false,
    idNumber: false,
    registerEmail: false,
    registerPassword: false,
  })

  const toggleForms = () => setActiveForm(activeForm === 'login' ? 'register' : 'login')

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePassword = (password) => password.length >= 6
  const validateText = (text) => text.trim() !== ""

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    
    const isEmailValid = validateEmail(loginEmail)
    const isPasswordValid = validatePassword(loginPassword)

    setErrors({
      ...errors,
      loginEmail: !isEmailValid,
      loginPassword: !isPasswordValid,
    })

    if (isEmailValid && isPasswordValid) {
      if (loginEmail === "xpjulian@hotmail.com" && loginPassword === "julianpaola12345") { 
        login()
        navigate('/gestion')
      } else {
        setErrors({
          ...errors,
          loginEmail: true,
          loginPassword: true,
        })
      }
    }
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    
    const isFirstNameValid = validateText(firstName)
    const isLastNameValid = validateText(lastName)
    const isIdNumberValid = validateText(idNumber)
    const isEmailValid = validateEmail(registerEmail)
    const isPasswordValid = validatePassword(registerPassword)

    setErrors({
      ...errors,
      firstName: !isFirstNameValid,
      lastName: !isLastNameValid,
      idNumber: !isIdNumberValid,
      registerEmail: !isEmailValid,
      registerPassword: !isPasswordValid,
    })

    if (isFirstNameValid && isLastNameValid && isIdNumberValid && isEmailValid && isPasswordValid) {
      alert("Registro exitoso")
    }
  }

  return (
    <div className="form-box">
      <h2 className="title">Bienvenido</h2>
      <p className="subtitle">Por favor, inicia sesión o regístrate</p>

      {/* Formulario de inicio de sesión */}
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
          <div id="loginEmailError" className="error-message" style={{display: errors.loginEmail ? 'block' : 'none'}}>
            {errors.loginEmail && errors.loginPassword ? "Correo o contraseña incorrectos" : "Email no válido."}
          </div>
          <input 
            type="password" 
            id="loginPassword" 
            className="input" 
            placeholder="Contraseña" 
            required
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <div id="loginPasswordError" className="error-message" style={{display: errors.loginPassword ? 'block' : 'none'}}>
            {errors.loginEmail && errors.loginPassword ? "Correo o contraseña incorrectos" : "Contraseña no válida (mínimo 6 caracteres)."}
          </div>
          <button type="submit">Iniciar Sesión</button>
          <div className="forgot-password">
            <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
        <div className="toggle-section">
          <p>¿No tienes una cuenta? <Link to="#" onClick={toggleForms}>Regístrate</Link></p>
        </div>
      </div>

      {/* Formulario de registro */}
      <div id="registerContainer" className={`form-container ${activeForm === 'register' ? 'active' : ''}`}>
        <form id="registerForm" className="form" onSubmit={handleRegisterSubmit}>
          <input 
            type="text" 
            id="firstName" 
            className="input" 
            placeholder="Nombre" 
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div id="firstNameError" className="error-message" style={{display: errors.firstName ? 'block' : 'none'}}>
            Nombre no válido.
          </div>
          <input 
            type="text" 
            id="lastName" 
            className="input" 
            placeholder="Apellido" 
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div id="lastNameError" className="error-message" style={{display: errors.lastName ? 'block' : 'none'}}>
            Apellido no válido.
          </div>
          <input 
            type="text" 
            id="idNumber" 
            className="input" 
            placeholder="Cédula" 
            required
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <div id="idNumberError" className="error-message" style={{display: errors.idNumber ? 'block' : 'none'}}>
            Cédula no válida.
          </div>
          <input 
            type="email" 
            id="registerEmail" 
            className="input" 
            placeholder="Email" 
            required
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <div id="registerEmailError" className="error-message" style={{display: errors.registerEmail ? 'block' : 'none'}}>
            Email no válido.
          </div>
          <input 
            type="password" 
            id="registerPassword" 
            className="input" 
            placeholder="Contraseña" 
            required
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <div id="registerPasswordError" className="error-message" style={{display: errors.registerPassword ? 'block' : 'none'}}>
            Contraseña no válida (mínimo 6 caracteres).
          </div>
          <button type="submit">Registrarse</button>
        </form>
        <div className="toggle-section">
          <p>¿Ya tienes una cuenta? <Link to="#" onClick={toggleForms}>Inicia sesión</Link></p>
        </div>
      </div>
      
      <button 
        className="create-credentials-button" 
        onClick={() => navigate('/credenciales')}
      >
        Crear Credenciales
      </button>
    </div>
  )
}

export default RegistroUsuario