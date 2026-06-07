import { useEffect, useState } from "react";
import api from "../services/api";
import "./Delivery.css";

const Delivery = () => {
  const [cart, setCart] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderItems = cart.map((item) => ({
        productId: item._id,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
      }));

      await api.post(
        "/orders",
        {
          items: orderItems,
          totalPrice: total,
          firstName,
          lastName,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart");
      setCart([]);

      alert("✅ Order placed successfully!");
    } catch (err) {
      console.log("Order error:", err);
      alert("❌ Error while placing order");
    }
  };

  return (
    <div className="delivery-page">
      <div className="delivery-container">

        <h2>🚚 Delivery Information</h2>

        {/* INPUTS */}
        <input
          className="delivery-input"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="delivery-input"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="delivery-input"
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          className="delivery-input textarea"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* ORDER SUMMARY */}
        <div className="order-box">
          <h3>🛒 Order Summary</h3>

          {cart.map((item) => (
            <div key={item._id} className="order-item">
              <strong>{item.brand}</strong>
              <p>Quantity: {item.quantity}</p>
              <p>{item.price * item.quantity} TND</p>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <h3 className="total-box">
          💰 Total: {total} TND
        </h3>

        {/* BUTTON */}
        <button
          className="confirm-btn"
          onClick={createOrder}
          disabled={
            !firstName ||
            !lastName ||
            !phone ||
            !address ||
            cart.length === 0
          }
        >
          ✅ Confirm Order
        </button>

      </div>
    </div>
  );
};

export default Delivery;