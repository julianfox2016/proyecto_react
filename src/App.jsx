import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // 👈 Importante
import ProtectedRoute from './components/ProtectedRoute';
import RegistroUsuario from './pages/RegistroUsuario';
import Gestion from './pages/Gestion';
import Credenciales from './pages/Credenciales';
import RecuperarContraseña from './pages/RecuperarContraseña';

function App() {
  return (
    <AuthProvider> {/* 👈 Envuelve todo */}
      <Router>
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<RegistroUsuario />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContraseña />} />

          {/* Rutas protegidas */}
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
    </AuthProvider>
  );
}

export default App;
