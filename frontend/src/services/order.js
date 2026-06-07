import axios from "axios";

const API = "http://localhost:3000/api/orders";

// ================= CREATE ORDER =================
export const createOrder = async (data) => {
  try {
    const res = await axios.post(API, data);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// ================= GET ALL ORDERS =================
export const getOrders = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// ================= GET ONE ORDER =================
export const getOneOrder = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error getting order:", error);
    throw error;
  }
};

// ================= UPDATE ORDER =================
export const updateOrder = async (id, data) => {
  try {
    const res = await axios.put(`${API}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// ================= DELETE ORDER =================
export const deleteOrder = async (id) => {
  try {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};
