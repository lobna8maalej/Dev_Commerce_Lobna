import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // ================= UPDATE CART COUNT =================
  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    setCartCount(count);
  };

  useEffect(() => {
    updateCount();
    const interval = setInterval(updateCount, 500);
    return () => clearInterval(interval);
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "15px 30px",
        background: "#111",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* CART */}
        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            position: "relative",
          }}
        >
          🛒 Cart

          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-15px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 7px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {/* DELIVERY */}
        <Link
          to="/delivery"
          style={{ color: "white", textDecoration: "none" }}
        >
          🚚 Delivery
        </Link>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;