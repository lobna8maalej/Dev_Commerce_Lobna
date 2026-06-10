import api from "./api";

// CREATE ORDER
export const createOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// GET USER ORDERS
export const getMyOrders = async () => {
  const res = await api.get("/orders/my-orders");
  return res.data;
};

// UPDATE ORDER (admin)
export const updateOrder = async (id, status) => {
  const res = await api.put(`/orders/${id}`, { status });
  return res.data;
};

// DELETE ORDER (admin)
export const deleteOrder = async (id) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};
