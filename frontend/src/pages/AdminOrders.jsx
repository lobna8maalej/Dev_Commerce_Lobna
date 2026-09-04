
import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // RÉCUPÉRER LES COMMANDES
  // =========================
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");

      console.log("ORDERS ADMIN:", res.data);

      // Si l'API retourne directement un tableau
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      }
      // Si l'API retourne { orders: [...] }
      else if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      }
      // Sinon
      else {
        setOrders([]);
      }

    } catch (err) {
      console.error(
        "❌ ERROR ORDERS:",
        err.response?.data || err.message
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // MODIFIER LE STATUT
  // =========================
  const updateStatus = async (id, newStatus) => {
    try {
      console.log("🔄 UPDATE ORDER:", id);
      console.log("📌 NEW STATUS:", newStatus);

      const res = await api.put(
        `/orders/${id}`,
        {
          orderStatus: newStatus,
        }
      );

      console.log("✅ UPDATED ORDER:", res.data);

      // Recharger les commandes après modification
      await fetchOrders();

    } catch (err) {
      console.error("❌ UPDATE ERROR:", err);

      console.error(
        "❌ RESPONSE:",
        err.response?.data
      );

      console.error(
        "❌ STATUS:",
        err.response?.status
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="orders-loading">
        <h2>Loading orders...</h2>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================
  return (
    <div className="admin-orders">

      {/* =========================
          TITLE
      ========================= */}
      <div className="orders-title">

        <h2>Customer Orders</h2>

        <span>
          {orders.length} orders
        </span>

      </div>

      {/* =========================
          NO ORDERS
      ========================= */}
      {orders.length === 0 ? (

        <div className="no-orders">
          <p>No orders found.</p>
        </div>

      ) : (

        <div className="orders-list">

          {orders.map((order) => {

            // =========================
            // STATUT
            // =========================
            const currentStatus =
              order.orderStatus || "pending";

            return (
              <div
                className="order-card"
                key={order._id}
              >

                {/* =========================
                    HEADER
                ========================= */}
                <div className="order-header">

                  <div>

                    <h3>
                      Order #
                      {order._id
                        ? order._id.slice(-6)
                        : "------"}
                    </h3>

                    <p className="order-id">
                      ID: {order._id}
                    </p>

                  </div>

                  <span
                    className={`order-status status-${currentStatus}`}
                  >
                    {currentStatus}
                  </span>

                </div>

                {/* =========================
                    INFORMATIONS CLIENT
                ========================= */}
                <div className="order-info">

                  {/* CLIENT */}
                  <div className="info-item">

                    <span className="label">
                      Client
                    </span>

                    <strong>
                      {order.customer?.firstName ||
                        order.user?.username ||
                        "Unknown"}{" "}

                      {order.customer?.lastName || ""}
                    </strong>

                  </div>

                  {/* PHONE */}
                  <div className="info-item">

                    <span className="label">
                      Phone
                    </span>

                    <strong>
                      {order.customer?.phone ||
                        "Unknown"}
                    </strong>

                  </div>

                  {/* ADDRESS */}
                  <div className="info-item">

                    <span className="label">
                      Address
                    </span>

                    <strong>
                      {order.address ||
                        "Unknown"}
                    </strong>

                  </div>

                  {/* TOTAL */}
                  <div className="info-item">

                    <span className="label">
                      Total
                    </span>

                    <strong className="order-total">
                      {Number(
                        order.totalPrice || 0
                      ).toFixed(2)}{" "}
                      TND
                    </strong>

                  </div>

                  {/* DATE */}
                  <div className="info-item">

                    <span className="label">
                      Date
                    </span>

                    <strong>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            "fr-FR"
                          )
                        : "Unknown"}
                    </strong>

                  </div>

                </div>

                {/* =========================
                    ACTIONS
                ========================= */}
                <div className="order-actions">

                  {/* =========================
                      PENDING → CONFIRMED
                  ========================= */}
                  {currentStatus === "pending" && (

                    <button
                      className="btn-confirm"
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "confirmed"
                        )
                      }
                    >
                      Confirm Order
                    </button>

                  )}

                  {/* =========================
                      CONFIRMED → SHIPPED
                  ========================= */}
                  {currentStatus === "confirmed" && (

                    <button
                      className="btn-shipped"
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "shipped"
                        )
                      }
                    >
                      Ship Order
                    </button>

                  )}

                  {/* =========================
                      SHIPPED → DELIVERED
                  ========================= */}
                  {currentStatus === "shipped" && (

                    <button
                      className="btn-delivered"
                      onClick={() =>
                        updateStatus(
                          order._id,
                          "delivered"
                        )
                      }
                    >
                      Delivered
                    </button>

                  )}

                  {/* =========================
                      DELIVERED
                  ========================= */}
                  {currentStatus === "delivered" && (

                    <span className="order-completed">
                      ✅ Order completed
                    </span>

                  )}

                  {/* =========================
                      CANCELLED
                  ========================= */}
                  {currentStatus === "cancelled" && (

                    <span className="order-cancelled">
                      ❌ Order cancelled
                    </span>

                  )}

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
};

export default AdminOrders;

