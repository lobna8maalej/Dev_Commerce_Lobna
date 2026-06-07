import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./HomeUser.css";

const HomeUser = () => {
  const [products, setProducts] = useState([]);
  const [animatingProduct, setAnimatingProduct] = useState(null);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/printers");
        setProducts(res.data);
      } catch (err) {
        console.log("Error loading printers:", err);
      }
    };

    fetchProducts();
  }, []);

  // ================= ADD TO CART + ANIMATION =================
  const addToCart = (product, e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // animation image
    setAnimatingProduct({
      image: product.image,
      x: rect.left,
      y: rect.top,
    });

    // get cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // check if exists
    const exists = cart.find((p) => p._id === product._id);

    if (exists) {
      cart = cart.map((p) =>
        p._id === product._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      cart.push({
        _id: product._id,
        brand: product.brand,
        model: product.model,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    // save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // remove animation
    setTimeout(() => {
      setAnimatingProduct(null);
    }, 700);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar />

      {/* ================= PAGE ================= */}
      <div className="home-user">
        <h2>🖨️ Available Printers</h2>

        <div className="grid">
          {products.map((p) => (
            <div key={p._id} className="card">

              {/* IMAGE */}
              <img
                src={p.image}
                alt={p.brand}
                width="150"
              />

              {/* INFO */}
              <h3>{p.brand}</h3>

              <p>{p.model}</p>

              <p>
                <b>{p.price} TND</b>
              </p>

              <p>Stock: {p.stock}</p>

              {/* BUTTON */}
              <button
                onClick={(e) => addToCart(p, e)}
                className="btn-cart"
              >
                🛒 Ajouter au panier
              </button>
            </div>
          ))}
        </div>

        {/* ================= FLY ANIMATION ================= */}
        {animatingProduct && (
          <img
            src={animatingProduct.image}
            alt="animation"
            className="fly-image"
            style={{
              top: animatingProduct.y,
              left: animatingProduct.x,
            }}
          />
        )}
      </div>
    </>
  );
};

export default HomeUser;
