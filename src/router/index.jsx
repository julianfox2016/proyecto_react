// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RegistroUsuario from '../pages/RegistroUsuario';
import RecuperarContraseña from '../pages/RecuperarContraseña';
import Gestion from '../components/gestion/Gestion';
import Credenciales from '../pages/Credenciales';
import ProtectedRoute from '../components/ProtectedRoute';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RegistroUsuario />,
  },
  {
    path: '/recuperar-contrasena',
    element: <RecuperarContraseña />,
  },
  {
    path: '/gestion',
    element: (
      <ProtectedRoute>
        <Gestion />
      </ProtectedRoute>
    ),
  },
  {
    path: '/credenciales',
    element: (
      <ProtectedRoute>
        <Credenciales />
      </ProtectedRoute>
    ),
  },
]);
export default router;