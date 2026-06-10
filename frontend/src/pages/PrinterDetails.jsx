import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PrinterDetails.css";

const PrinterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [printer, setPrinter] = useState(null);

  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        const res = await api.get(`/printers/${id}`);
        setPrinter(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPrinter();
  }, [id]);

  const addToCart = () => {
    if (!printer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p._id === printer._id);

    if (exists) {
      cart = cart.map((p) =>
        p._id === printer._id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      cart.push({
        _id: printer._id,
        brand: printer.brand,
        model: printer.model,
        price: printer.price,
        image: printer.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté ");
  };

  if (!printer) return <p>Loading...</p>;

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

          <h2 className="title">{printer.brand}</h2>

          <p className="model">{printer.model}</p>

          <p className="price">{printer.price} TND</p>

          <p className="stock">Stock: {printer.stock}</p>

          <button className="btn btn-cart" onClick={addToCart}>
            Ajouter au panier 
          </button>

          <button className="btn btn-blue" onClick={() => navigate("/cart")}>
            Voir le panier
          </button>

          <button className="btn btn-gray" onClick={() => navigate(-1)}>
            Retour
          </button>

        </div>

      </div>

    </div>
  );
};

export default PrinterDetails;