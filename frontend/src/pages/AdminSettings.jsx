
import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/settings");

        console.log("SETTINGS:", response.data);

        if (response.data.success) {
          setSettings(response.data.settings);
        }
      } catch (error) {
        console.error(
          "SETTINGS ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-page">
        <h2>Loading settings...</h2>
      </div>
    );
  }

  // =========================
  // NO SETTINGS
  // =========================

  if (!settings) {
    return (
      <div className="admin-page">
        <p>Aucun paramètre disponible.</p>
      </div>
    );
  }

  // =========================
  // DISPLAY SETTINGS
  // =========================

  return (
    <div className="admin-page">

      <div className="page-header">
        <h1>⚙️ Store Settings</h1>
        <p>Configuration de votre Printer Store</p>
      </div>

      <div className="settings-container">

        {/* ================= STORE INFORMATION ================= */}

        <div className="settings-card">

          <h2>🏪 Store Information</h2>

          <p>
            <strong>Store Name:</strong>{" "}
            {settings.storeName || "Non configuré"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {settings.email || "Non configuré"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {settings.phone || "Non configuré"}
          </p>

          <p>
            <strong>Address:</strong>{" "}
            {settings.address || "Non configurée"}
          </p>

        </div>

        {/* ================= DELIVERY ================= */}

        <div className="settings-card">

          <h2>🚚 Delivery</h2>

          <p>
            <strong>Delivery Fee:</strong>{" "}
            {settings.deliveryFee ?? 0} TND
          </p>

          <p>
            <strong>Free Delivery Above:</strong>{" "}
            {settings.freeDeliveryAbove ?? 0} TND
          </p>

          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {settings.estimatedDelivery || "2-4 days"}
          </p>

        </div>

        {/* ================= PAYMENT ================= */}

        <div className="settings-card">

          <h2>💵 Payment</h2>

          <p>
            <strong>Payment Method:</strong>{" "}
            {settings.paymentMethod || "Cash on Delivery"}
          </p>

          <p>
            Le client paie à la livraison.
          </p>

        </div>

        {/* ================= NOTIFICATIONS ================= */}

        <div className="settings-card">

          <h2>🔔 Notifications</h2>

          <p>
            <strong>New Order:</strong>{" "}
            {settings.notifications?.newOrder
              ? "✅ Enabled"
              : "❌ Disabled"}
          </p>

          <p>
            <strong>New Review:</strong>{" "}
            {settings.notifications?.newReview
              ? "✅ Enabled"
              : "❌ Disabled"}
          </p>

          <p>
            <strong>Low Stock:</strong>{" "}
            {settings.notifications?.lowStock
              ? "✅ Enabled"
              : "❌ Disabled"}
          </p>

          <p>
            <strong>New Customer:</strong>{" "}
            {settings.notifications?.newCustomer
              ? "✅ Enabled"
              : "❌ Disabled"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminSettings;


