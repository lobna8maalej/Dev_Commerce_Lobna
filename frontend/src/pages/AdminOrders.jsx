import { useEffect, useState } from "react";
import api from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await api.put(
      `/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(
      orders.map((o) =>
        o._id === id ? res.data : o
      )
    );
  };

  return (
    <div>
      <h2>Admin Orders</h2>

      {orders.map((o) => (
        <div key={o._id} style={{ border: "1px solid gray", margin: 10 }}>
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