import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RegistroUsuario from './pages/RegistroUsuario';
import Gestion from './pages/Gestion';
import Credenciales from './pages/Credenciales';
import RecuperarContraseña from './pages/RecuperarContraseña';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública (login/registro) */}
        <Route path="/" element={<RegistroUsuario />} />
        
        {/* Ruta para recuperación de contraseña (pública) */}
        <Route path="/recuperar-contrasena" element={<RecuperarContraseña />} />
        
        {/* Rutas protegidas (requieren autenticación) */}
        <Route path="/gestion" element={
          <ProtectedRoute>
            <Gestion />
          </ProtectedRoute>
        } />
        
        <Route path="/credenciales" element={
          <ProtectedRoute>
            <Credenciales />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;