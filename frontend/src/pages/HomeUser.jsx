
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./HomeUser.css";

const HomeUser = () => {
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/auth");
  };

  // =========================
  // RÉCUPÉRER LES IMPRIMANTES
  // =========================

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        setLoading(true);

        console.log("🔄 Chargement des imprimantes...");
        console.log("🌐 API :", api.defaults.baseURL);

        const response = await api.get("/printers");

        console.log("✅ STATUS :", response.status);
        console.log("✅ PRINTERS :", response.data);

        let products = [];

        if (Array.isArray(response.data)) {
          products = response.data;
        } else if (Array.isArray(response.data?.printers)) {
          products = response.data.printers;
        } else if (Array.isArray(response.data?.data)) {
          products = response.data.data;
        }

        console.log("🖨️ PRODUITS :", products);

        setPrinters(products);

      } catch (err) {
        console.error(
          "❌ ERROR LOADING PRINTERS:",
          err.response?.data || err.message
        );

        // En cas d'erreur, on affiche simplement une liste vide
        setPrinters([]);

      } finally {
        setLoading(false);
      }
    };

    fetchPrinters();
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="home-user">

        <header className="user-header">

          <div className="store-logo">
            Printer Store
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            🚪 Déconnexion
          </button>

        </header>

        <section className="products-section">

          <div className="loading-container">

            <div className="loader"></div>

            <p>
              Chargement des imprimantes...
            </p>

          </div>

        </section>

      </div>
    );
  }

  // =========================
  // PAGE PRINCIPALE
  // =========================

  return (
    <div className="home-user">

      {/* =========================
          HEADER
      ========================= */}

      <header className="user-header">

        <div className="store-logo">
          Printer Store
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          🚪 Déconnexion
        </button>

      </header>

      {/* =========================
          PRODUITS
      ========================= */}

      <section
        id="products"
        className="products-section"
      >

        <div className="section-header">

          <h2>
            🖨️ Nos imprimantes
          </h2>

          <p>
            {printers.length} produit
            {printers.length > 1 ? "s" : ""}{" "}
            disponible
            {printers.length > 1 ? "s" : ""}
          </p>

        </div>

        {/* =========================
            AUCUN PRODUIT
        ========================= */}

        {printers.length === 0 ? (

          <div className="empty-products">

            <div className="empty-icon">
              📦
            </div>

            <h3>
              Aucun produit disponible
            </h3>

            <p>
              Aucun produit n'est actuellement
              disponible dans notre catalogue.
            </p>

          </div>

        ) : (

          <div className="products-grid">

            {printers.map((printer) => {

              const stock = Number(
                printer.stock || 0
              );

              const price = Number(
                printer.price || 0
              );

              return (

                <div
                  className="product-card"
                  key={printer._id}
                >

                  {/* =========================
                      IMAGE
                  ========================= */}

                  <div className="product-image">

                    {printer.image ? (

                      <img
                        src={printer.image}
                        alt={`${printer.brand || ""} ${printer.model || ""}`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                    ) : (

                      <div className="no-image">
                        🖨️
                      </div>

                    )}

                  </div>

                  {/* =========================
                      INFORMATIONS
                  ========================= */}

                  <div className="product-info">

                    {printer.brand && (
                      <p className="brand">
                        {printer.brand}
                      </p>
                    )}

                    <h3>
                      {printer.model || "Imprimante"}
                    </h3>

                    {printer.description && (
                      <p className="description">
                        {printer.description}
                      </p>
                    )}

                    <div className="price">
                      {price.toFixed(2)} TND
                    </div>

                    <div
                      className={
                        stock > 0
                          ? "stock available"
                          : "stock unavailable"
                      }
                    >
                      {stock > 0
                        ? `✅ ${stock} en stock`
                        : "❌ Rupture de stock"}
                    </div>

                    <Link
                      to={`/printers/${printer._id}`}
                      className="details-button"
                    >
                      Voir le produit
                    </Link>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>

    </div>
  );
};

export default HomeUser;
