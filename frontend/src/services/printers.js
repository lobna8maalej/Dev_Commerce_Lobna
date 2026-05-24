
import axios from "axios";

const API = "http://localhost:3000/api/printers";

export const createPrinters = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/printers", data);
    return res.data;
  } catch (error) {
    console.error("Error creating printer:", error);
    throw error;
  }
};
export const getPrinters = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/printers`);
    return res.data;
  } catch (error) {
    console.error("Error fetching printers:", error);
    throw error;
  }
};
export const getOnePrinter = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/printers/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error getting printer:", error);
    throw error;
  }
};