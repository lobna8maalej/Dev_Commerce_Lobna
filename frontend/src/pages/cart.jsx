import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // LOAD CART
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };
  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    updateCart(updated);
  };

  // TOTAL PRICE
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* TITLE */}
        <h2 className="cart-title"> My Cart</h2>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item._id}>

              {/* INFO */}
              <div className="cart-info">
                <h4>{item.brand}</h4>
                <p>{item.model}</p>
                <p>{item.price} TND</p>
              </div>

              {/* QTY */}
              <div className="qty-box">
                <button onClick={() => decreaseQty(item._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)}>+</button>
              </div>

              {/* REMOVE */}
              <button
                className="remove-btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </button>

            </div>
          ))
        )}

        {/* TOTAL */}
        <div className="cart-total">
          Total: {total} TND
        </div>

        {/* CHECKOUT */}
        <button
          className="checkout-btn"
          onClick={() => navigate("/delivery")}
          disabled={cart.length === 0}
        >
          Proceed to Delivery
        </button>

      </div>
    </div>
  );
};

export default Cart;
