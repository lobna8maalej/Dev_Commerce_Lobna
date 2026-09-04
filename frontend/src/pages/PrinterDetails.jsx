
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PrinterDetails.css";

const PrinterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [printer, setPrinter] = useState(null);

  // =========================
  // GET PRINTER
  // =========================
  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const res = await api.get(`/printers/${id}`);

        console.log("PRINTER:", res.data);

        setPrinter(res.data);
      } catch (error) {
        console.error(
          "ERROR PRINTER:",
          error.response?.data || error.message
        );
      }
    };

    fetchPrinter();
  }, [id]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = () => {
    console.log("ADD TO CART CLICKED");

    if (!printer) {
      console.log("Printer not loaded");
      return;
    }

    try {
      // Récupérer le panier
      let cart = [];

      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        cart = JSON.parse(savedCart);
      }

      // Vérifier que le panier est bien un tableau
      if (!Array.isArray(cart)) {
        cart = [];
      }

      // Chercher le produit
      const existingProduct = cart.find(
        (item) => String(item._id) === String(printer._id)
      );

      // =========================
      // PRODUCT ALREADY IN CART
      // =========================
      if (existingProduct) {
        cart = cart.map((item) => {
          if (String(item._id) === String(printer._id)) {
            return {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            };
          }

          return item;
        });
      }

      // =========================
      // NEW PRODUCT
      // =========================
      else {
        cart.push({
          _id: printer._id,
          brand: printer.brand,
          model: printer.model,
          price: Number(printer.price),
          image: printer.image,
          quantity: 1,
        });
      }

      // Sauvegarder
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      // Actualiser le compteur du Navbar
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      console.log("CART AFTER ADD:", cart);

      alert("Produit ajouté au panier !");
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error
      );

      alert(
        "Erreur lors de l'ajout au panier."
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (!printer) {
    return (
      <div className="printer-page">
        <p>Loading...</p>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================
  return (
    <div className="printer-page">

      <div className="printer-card">

        <img
          className="printer-image"
          src={
            printer.image ||
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/printing-and-branding-services-design-template-bf10795692efd7c6f2087f42acbf89e1_screen.jpg"
          }
          alt={printer.brand}
        />

        <div className="printer-content">

          <h2 className="title">
            {printer.brand}
          </h2>

          <p className="model">
            {printer.model}
          </p>

          <p className="price">
            {printer.price} TND
          </p>

          <p className="stock">
            Stock: {printer.stock}
          </p>

          {/* =========================
              ADD TO CART
              ========================= */}
          <button
            type="button"
            className="btn btn-cart"
            onClick={addToCart}
          >
            Ajouter au panier
          </button>

          {/* =========================
              VIEW CART
              ========================= */}
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => navigate("/cart")}
          >
            Voir le panier
          </button>

          {/* =========================
              BACK
              ========================= */}
          <button
            type="button"
            className="btn btn-gray"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>

        </div>

      </div>

    </div>
  );
};

export default PrinterDetails;

