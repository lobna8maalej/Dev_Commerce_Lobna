import axios from "axios";

const API = "http://localhost:3000/api/printers";

// CREATE
export const createPrinter = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(API, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating printer:", error);
    throw error;
  }
};

// READ ALL
export const getPrinters = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching printers:", error);
    throw error;
  }
};

// READ ONE
export const getOnePrinter = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error getting printer:", error);
    throw error;
  }
};

// UPDATE
export const updatePrinter = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating printer:", error);
    throw error;
  }
};

// DELETE
export const deletePrinter = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting printer:", error);
    throw error;
  }
};

