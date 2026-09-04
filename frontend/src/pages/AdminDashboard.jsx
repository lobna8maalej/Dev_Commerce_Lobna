import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {

  // =========================
  // DONNÉES DASHBOARD
  // =========================

  const [orders, setOrders] = useState([]);
  const [printers, setPrinters] = useState([]);

  const [loading, setLoading] = useState(true);

  // =========================
  // RÉCUPÉRER LES DONNÉES
  // =========================

  useEffect(() => {

    const fetchData = async () => {

      try {

        const [ordersRes, printersRes] = await Promise.all([
          api.get("/orders"),
          api.get("/printers"),
        ]);

        // =========================
        // DEBUG
        // =========================

        console.log(
          "ORDERS DASHBOARD:",
          ordersRes.data
        );

        console.log(
          "PRINTERS DASHBOARD:",
          printersRes.data
        );

        // =========================
        // ORDERS
        // =========================

        setOrders(
          Array.isArray(ordersRes.data)
            ? ordersRes.data
            : ordersRes.data.orders || []
        );

        // =========================
        // PRINTERS
        // =========================

        setPrinters(
          Array.isArray(printersRes.data)
            ? printersRes.data
            : printersRes.data.printers || []
        );

      } catch (err) {

        console.error(
          "ADMIN DASHBOARD ERROR:",
          err.response?.data || err.message
        );

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);

  // =========================
  // CALCULS
  // =========================

  // Nombre total de commandes

  const totalOrders = orders.length;

  // Nombre total de produits

  const totalProducts = printers.length;

  // Produits avec stock faible

  const lowStock = printers.filter(
    (printer) =>
      Number(printer.stock || 0) <= 10
  ).length;

  // =========================
  // TOTAL SALES
  // =========================

  const totalSales = orders.reduce(
    (sum, order) =>
      sum + Number(order.totalPrice || 0),
    0
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="admin-page">

        <h2>
          Loading dashboard...
        </h2>

      </div>
    );

  }

  // =========================
  // DASHBOARD
  // =========================

  return (

    <div className="admin-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">

        <h1>
          🖨️ Dashboard Overview
        </h1>

        <p>
          Gestion de votre Printer Store
        </p>

      </div>

      {/* =========================
          STATISTIQUES
      ========================= */}

      <div className="cards">

        {/* TOTAL SALES */}

        <div className="card blue">

          <h3>
            💰 Total Sales
          </h3>

          <p>
            {totalSales.toFixed(2)} TND
          </p>

        </div>

        {/* ORDERS */}

        <div className="card green">

          <h3>
            📦 Orders
          </h3>

          <p>
            {totalOrders}
          </p>

        </div>

        {/* PRODUCTS */}

        <div className="card orange">

          <h3>
            🖨️ Products
          </h3>

          <p>
            {totalProducts}
          </p>

        </div>

        {/* LOW STOCK */}

        <div className="card red">

          <h3>
            ⚠️ Low Stock
          </h3>

          <p>
            {lowStock}
          </p>

        </div>

      </div>

      {/* =========================
          INFORMATIONS
      ========================= */}

      <div className="dashboard-section">

        <h2>
          📋 Store Overview
        </h2>

        <div className="overview-card">

          <p>
            <strong>
              Total Orders:
            </strong>{" "}
            {totalOrders}
          </p>

          <p>
            <strong>
              Total Products:
            </strong>{" "}
            {totalProducts}
          </p>

          <p>
            <strong>
              Low Stock Products:
            </strong>{" "}
            {lowStock}
          </p>

          <p>
            <strong>
              Total Sales:
            </strong>{" "}
            {totalSales.toFixed(2)} TND
          </p>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;