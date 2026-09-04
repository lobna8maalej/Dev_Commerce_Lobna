import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const updateCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const count = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error("CART COUNT ERROR:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/auth");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#111",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        🖨️ Printer Store
      </Link>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Home
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            textDecoration: "none",
            position: "relative",
            fontWeight: "500",
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
                minWidth: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

