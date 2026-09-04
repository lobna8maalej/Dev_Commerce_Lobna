
import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminSales.css";

const AdminSales = () => {
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get("/sales/overview");

        console.log("SALES:", response.data);

        if (response.data.success) {
          setSales(response.data);
        }
      } catch (error) {
        console.error(
          "SALES ERROR:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="admin-page">
        <h2>Loading sales...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="page-header">
        <h1>📊 Sales & Analytics</h1>
        <p>Analyse des ventes de votre Printer Store</p>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="cards">

        {/* TOTAL SALES */}
        <div className="card blue">
          <h3>💰 Total Sales</h3>
          <p>
            {Number(sales?.totalSales || 0).toFixed(2)} TND
          </p>
        </div>

        {/* PAID ORDERS */}
        <div className="card green">
          <h3>📦 Paid Orders</h3>
          <p>
            {sales?.paidOrders || 0}
          </p>
        </div>

        {/* AVERAGE ORDER */}
        <div className="card orange">
          <h3>🛒 Average Order</h3>
          <p>
            {Number(sales?.averageOrder || 0).toFixed(2)} TND
          </p>
        </div>

      </div>

      {/* ================= BEST SELLING ================= */}

      <div className="dashboard-section">

        <h2>🏆 Best Selling Products</h2>

        {sales?.bestSellingProducts?.length > 0 ? (

          <div className="products-list">

            {sales.bestSellingProducts.map(
              (product, index) => (

                <div
                  className="product-stat"
                  key={index}
                >

                  <span>
                    #{index + 1}
                  </span>

                  <span>
                    Product: {product.name}
                  </span>

                  <span>
                    Quantity: {product.quantity}
                  </span>

                </div>
              )
            )}

          </div>

        ) : (

          <div className="empty-sales">
            <p>📦 Aucun produit vendu pour le moment.</p>
          </div>

        )}

      </div>

    </div>
  );
};

export default AdminSales;


