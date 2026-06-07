import SimpleChart from "../components/charts/SimpleChart";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [printers, setPrinters] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const [ordersRes, printersRes] = await Promise.all([
        api.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get("/printers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setOrders(ordersRes.data);
      setPrinters(printersRes.data);
    };

    fetchData();
  }, []);

  // ================= KPIs =================
  const totalSales = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalOrders = orders.length;
  const totalProducts = printers.length;
  const lowStock = printers.filter((p) => p.stock < 5).length;

  return (
    <div className="admin-page">
      <Navbar />

      <h2>Admin Dashboard</h2>

      {/* ================= CARDS ================= */}
      <div className="cards">
        <div className="card blue">
          <h3>Total Sales</h3>
          <p>{totalSales} TND</p>
        </div>

        <div className="card green">
          <h3>Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div className="card orange">
          <h3>Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="card red">
          <h3>Low Stock</h3>
          <p>{lowStock}</p>
        </div>
      </div>

      {/* ================= SIMPLE CHART ================= */}
      <h3>Orders Trend</h3>
      <SimpleChart orders={orders} />
    </div>
  );
};

export default AdminDashboard;