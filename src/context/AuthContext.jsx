import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el proveedor
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    user,
    login: (userData) => setUser(userData),
    logout: () => setUser(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Crear el hook personalizado (asegúrate de exportarlo)
export function useAuth() {  // <-- Esta es la exportación que falta
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}