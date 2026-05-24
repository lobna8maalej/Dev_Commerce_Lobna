import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("http://localhost:3000/api/auth/login", {
    email,
    password,
  });

  return response.data;
};