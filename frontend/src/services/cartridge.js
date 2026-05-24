
import axios from "axios";

const API = "http://localhost:3000/api/cartridge";

export const createCartridge = async (data) => {
  try {
    const res = await axios.post(API, data);
    return res.data;
  } catch (error) {
    console.error("Error creating cartridge:", error);
    throw error;
  }
};

export const getCartridges = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching cartridges:", error);
    throw error;
  }
};

export const getOneCartridge = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    console.log(id);
    
    return res.data;
  } catch (error) {
    console.log(error);
    
    console.error("Error getting cartridge:", error);
    throw error;
  }
};

export const updateCartridge = async (id, data) => {
  try {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating cartridge:", error);
    throw error;
  }
};
export const deleteCartridge = async (id) => {
  try {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting cartridge:", error);
    throw error;
  }
};