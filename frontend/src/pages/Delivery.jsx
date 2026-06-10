import { useEffect, useState } from "react";
import { createOrder } from "../services/order";
import "./Delivery.css";

export default function Delivery() {

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

  const placeOrder = async () => {

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {

      // ✔ ORDER ITEMS
      const orderItems = cart.map((item) => ({
        printer: item._id,
        priceAtPurchase: item.price,
        quantity: item.quantity,
      }));

      // ✔ ORDER OBJECT (MISSING IN YOUR CODE)
      const order = {
        items: orderItems,
        totalPrice: total,
        address,
        customer: {
          firstName,
          lastName,
          phone,
        },
        date: new Date(),
      };

      console.log("ORDER SENT:", order);

      const res = await createOrder(order);

      console.log("ORDER SUCCESS:", res);

      localStorage.removeItem("cart");
      setCart([]);

      alert("Order placed successfully");

    } catch (err) {
      console.log("ORDER ERROR:", err.response?.data || err.message);
      alert("Order failed");
    }
  };

  return (
    <div className="delivery-page">

      <div className="delivery-container">

        <h1>Delivery</h1>

        <input
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />

        <h2>Total: {total} TND</h2>

        <button
          onClick={placeOrder}
          disabled={!address || cart.length === 0}
        >
          Confirm Order
        </button>

      </div>

    </div>
  );
}