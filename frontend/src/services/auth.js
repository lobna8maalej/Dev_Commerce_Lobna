import axios from "axios";

// Fonction login
export const login = async (email, password) => {
  const response = await axios.post("http://localhost:3000/api/auth/login", {
    email,
    password,
  });
  return response.data; // contient { user, token }
};

// Fonction register
export const register = async (username, email, password) => {
  const response = await axios.post("http://localhost:3000/api/auth/register", {
    username,
    email,
    password,
  });
  return response.data; // contient { user, token }
};

// Fonction logout
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
