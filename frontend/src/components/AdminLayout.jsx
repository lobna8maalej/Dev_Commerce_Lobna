import { Link, Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="admin-layout">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <h2>🖨️ Printer Admin</h2>

        <nav>

          <Link
            to="/admin"
            className={location.pathname === "/admin" ? "active" : ""}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className={location.pathname === "/admin/orders" ? "active" : ""}
          >
            📦 Orders
          </Link>

          <Link
            to="/admin/products"
            className={location.pathname === "/admin/products" ? "active" : ""}
          >
            🖨️ Products
          </Link>

          <Link
            to="/admin/stock"
            className={location.pathname === "/admin/stock" ? "active" : ""}
          >
            📋 Stock
          </Link>

          <Link
            to="/admin/sales"
            className={location.pathname === "/admin/sales" ? "active" : ""}
          >
            📊 Sales
          </Link>

          <Link
            to="/admin/settings"
            className={location.pathname === "/admin/settings" ? "active" : ""}
          >
            ⚙️ Settings
          </Link>

        </nav>

      </aside>

      {/* ================= CONTENT ================= */}

      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;