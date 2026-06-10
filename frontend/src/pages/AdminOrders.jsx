import { useEffect, useState } from "react";
import api from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.log("ERROR:", err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? res.data : o
        )
      );
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Admin Orders</h2>

      {orders.map((o) => (
        <div
          key={o._id}
          style={{ border: "1px solid gray", margin: 10 }}
        >
          <p>Client: {o.user?.email}</p>
          <p>Total: {o.totalPrice} TND</p>
          <p>Status: {o.status}</p>

          <button onClick={() => updateStatus(o._id, "processing")}>
            Processing
          </button>

          <button onClick={() => updateStatus(o._id, "delivered")}>
            Delivered
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;