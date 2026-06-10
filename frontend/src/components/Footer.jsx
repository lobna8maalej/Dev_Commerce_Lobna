import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-section">
          <h2 className="footer-title"> MyShop</h2>
          <p className="footer-text">
            Smart E-Commerce Platform with Admin Dashboard & Analytics
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <a href="/home">Home</a>
          <a href="/cart">Cart</a>
          <Link to="/auth">Login</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p> Tunisia</p>
          <p>lobnamaalej89@gmail.com</p>
          <p> +216 58 229886</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MyShop - All rights reserved
      </div>
    </footer>
  );
};

export default Footer;

