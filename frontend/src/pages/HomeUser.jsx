import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./HomeUser.css";

const HomeUser = () => {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [animatingProduct, setAnimatingProduct] = useState(null);

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/printers");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log("Error loading printers:", err);
      }
    };

    fetchProducts();
  }, []);

  // ================= FILTER =================
  useEffect(() => {

    const filtered = products.filter((p) =>
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.model.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);

  }, [search, products]);

  const addToCart = (product, e) => {

    const rect = e.currentTarget.getBoundingClientRect();

    setAnimatingProduct({
      image: product.image,
      x: rect.left,
      y: rect.top,
    });

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p._id === product._id);

    if (exists) {
      alert("Already in cart");
      return;
    }

    // ✔ AJOUT UNE SEULE FOIS
    cart.push({
      _id: product._id,
      brand: product.brand,
      model: product.model,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    setTimeout(() => {
      setAnimatingProduct(null);
    }, 700);
  };

  return (
    <>
      <Navbar />

      <div className="home-user">

        <h2>Available Printers</h2>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search printer (brand or model)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {/* PRODUCTS */}
        <div className="grid">

          {filteredProducts.map((p) => (
            <div key={p._id} className="card">

              <img src={p.image} alt={p.brand} width="150" />

              <h3>{p.brand}</h3>
              <p>{p.model}</p>
              <p><b>{p.price} TND</b></p>
              <p>Stock: {p.stock}</p>

              <button
                onClick={(e) => addToCart(p, e)}
                className="btn-cart"
              >
                Ajouter au panier
              </button>

            </div>
          ))}

        </div>

        {/* ANIMATION */}
        {animatingProduct && (
          <img
            src={animatingProduct.image}
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