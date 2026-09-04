
import { useEffect, useState } from "react";
import { createOrder } from "../services/order";
import "./Delivery.css";

export default function Delivery() {
  const [cart, setCart] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Charger le panier
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      const savedCart = stored ? JSON.parse(stored) : [];

      if (Array.isArray(savedCart)) {
        setCart(savedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("CART LOAD ERROR:", error);
      setCart([]);
    }
  }, []);

  // Calcul du total
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const placeOrder = async () => {
    // Vérifier le panier
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Vérifier les informations
    if (!firstName || !lastName || !phone || !address) {
      alert("Please complete all delivery information.");
      return;
    }

    try {
      // Préparer les produits de la commande
      const orderItems = cart.map((item) => ({
        printer: item._id,
        priceAtPurchase: Number(item.price),
        quantity: Number(item.quantity),
      }));

      // Objet envoyé au backend
      const order = {
        items: orderItems,
        totalPrice: total,
        address: address,

        // Informations du client
        customer: {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
        },
      };

      console.log("ORDER SENT:", order);

      // Envoyer la commande
      const res = await createOrder(order);

      console.log("ORDER SUCCESS:", res);

      // Vider le panier
      localStorage.removeItem("cart");
      setCart([]);

      // Mettre à jour le compteur du panier
      window.dispatchEvent(new Event("cartUpdated"));

      // Confirmation
      alert("Order placed successfully!");

    } catch (err) {
      console.error(
        "ORDER ERROR:",
        err.response?.data || err.message
      );

      if (err.code === "ERR_NETWORK") {
        alert(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        alert(
          err.response?.data?.message ||
          "Order failed"
        );
      }
    }
  };

  return (
    <div className="delivery-page">
      <div className="delivery-container">

        <h1>Delivery</h1>

        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2>
          Total: {total.toFixed(2)} TND
        </h2>

        <button
          type="button"
          onClick={placeOrder}
          disabled={
            !firstName ||
            !lastName ||
            !phone ||
            !address ||
            cart.length === 0
          }
        >
          Confirm Order
        </button>

      </div>
    </div>
  );
}

