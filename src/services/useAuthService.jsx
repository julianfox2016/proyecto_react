// Importación de la librería axios para realizar solicitudes HTTP
import axios from 'axios';
// exportación de la función useAuthService
export const useAuthService = () => {
  const API_URL = 'http://localhost:3000/api/auth'; // URL de la API de autenticación

  // Función para iniciar sesión de un usuario
  const loginUser = async (email, password) => {
      try {
        const peticion = `${API_URL}/login`;
      
      // Validación de la contraseña para asegurarse de que tenga al menos 6 caracteres
      const response = await axios.post(peticion, {
        user_email: email,
        password: password
      });
    
      console.log('Login response:', response.data); // Imprime la respuesta de la API en la consola para depuración

      return response.data;
    }catch(error){
      //Poner una alert personaliza, ejemplo sweetalert2, toastify.
      alert(error.response.data.message); // Muestra un mensaje de error hay error en la solicitud
    }
  };
// Función para registrar un nuevo usuario
  const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
      user_email: email,
      password: password
    });
    return response.data;
  };

  return { loginUser, registerUser };
};
