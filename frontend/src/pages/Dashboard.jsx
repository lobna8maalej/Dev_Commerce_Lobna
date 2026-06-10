import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/printers");
        setProducts(res.data);
      } catch (err) {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const goToOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/delivery");
  };
  const deleteProduct = async (id) => {
    await api.delete(`/printers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">

        <h2>Printers Shop</h2>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {/* CART */}
        <button onClick={goToOrder} className="btn-primary">
          Go to Order ({cart.length})
        </button>

        <div className="dashboard-grid">
          {products.map((p) => (
            <div className="dashboard-card" key={p._id}>

              <h4>{p.brand}</h4>
              <p>{p.model}</p>
              <p>{p.price} TND</p>
              <p>Stock: {p.stock}</p>

              <button onClick={() => addToCart(p)}>
                Add to cart
              </button>

              {/* ADMIN ONLY */}
              {user?.role === "admin" && (
                <button onClick={() => deleteProduct(p._id)}>
                  Delete
                </button>
              )}

              <button onClick={() => navigate(`/printers/${p._id}`)}>
                Details
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;