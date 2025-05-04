// src/services/useAuthService.js
import axios from 'axios';

export const useAuthService = () => {
  const API_URL = 'http://localhost:3000/api/auth';

  const loginUser = async (email, password) => {
    const peticion = `${API_URL}/login`;
  
    const response = await axios.post(peticion, {
      user_email: email,
      password: password
    });
    
    console.log('Login response:', response.data); // Log the response data for debugging

    return response.data;
  };

  const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
      user_email: email,
      password: password
    });
    return response.data;
  };

  return { loginUser, registerUser };
};
