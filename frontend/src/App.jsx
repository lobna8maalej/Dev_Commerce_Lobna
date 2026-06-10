import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// USER PAGES
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import PrinterDetails from "./pages/PrinterDetails";

// AUTH
import Auth from "./pages/Auth";

// ADMIN
import AdminDashboard from "./pages/AdminDashboard";

// PROTECTION
import PrivateRoute from "./pages/PrivateRoute";

// FOOTER
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>

        {/* REDIRECTION PAR DÉFAUT */}
        <Route path="/" element={<Navigate to="/auth" />} />

        {/* AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* USER HOME */}
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

        {/* CART */}
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

        {/* DELIVERY */}
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

        {/* PRINTER DETAILS */}
        <Route
          path="/printers/:id"
          element={
            <PrivateRoute>
              <>
                <PrinterDetails />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;