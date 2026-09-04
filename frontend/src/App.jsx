import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// =========================
// USER
// =========================
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import PrinterDetails from "./pages/PrinterDetails";

// =========================
// AUTH
// =========================
import Auth from "./pages/Auth";

// =========================
// ADMIN
// =========================
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/adminProducts";
import AdminStock from "./pages/adminStock";
import AdminSales from "./pages/AdminSales";
import AdminSettings from "./pages/AdminSettings";
import AdminLayout from "./components/AdminLayout";

// =========================
// PROTECTION
// =========================
import PrivateRoute from "./components/PrivateRoute";

// =========================
// FOOTER
// =========================
import Footer from "./components/Footer";


function App() {
  return (
    <Router>

      <Routes>

        {/* =========================
            ACCUEIL
        ========================= */}

        <Route
          path="/"
          element={
            <>
              <HomeUser />
              <Footer />
            </>
          }
        />

        {/* =========================
            AUTHENTIFICATION
        ========================= */}

        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* =========================
            USER CONNECTÉ
        ========================= */}

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <>
                <HomeUser />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <>
                <Cart />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/delivery"
          element={
            <PrivateRoute>
              <>
                <Delivery />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* =========================
            DÉTAIL PRODUIT
        ========================= */}

        <Route
          path="/printers/:id"
          element={
            <>
              <PrinterDetails />
              <Footer />
            </>
          }
        />

        {/* =========================
            ADMIN
        ========================= */}

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >

          {/* Dashboard */}
          <Route
            index
            element={<AdminDashboard />}
          />

          {/* Orders */}
          <Route
            path="orders"
            element={<AdminOrders />}
          />

          {/* Products */}
          <Route
            path="products"
            element={<AdminProducts />}
          />

          {/* Stock */}
          <Route
            path="stock"
            element={<AdminStock />}
          />

          {/* Sales */}
          <Route
            path="sales"
            element={<AdminSales />}
          />

          {/* Settings */}
          <Route
            path="settings"
            element={<AdminSettings />}
          />

        </Route>

        {/* =========================
            FALLBACK
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </Router>
  );
}

export default App;