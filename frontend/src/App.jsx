import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// USER PAGES
import HomeUser from "./pages/HomeUser";
import Cart from "./pages/Cart";
import Delivery from "./pages/Delivery";
import PrinterDetails from "./pages/PrinterDetails";

// AUTH
import Login from "./pages/Login";
import Register from "./pages/Register";

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

        {/* DEFAULT ROUTE */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* USER HOME */}
        <Route
          path="/home"
          element={
            <>
              <PrivateRoute>
                <HomeUser />
              </PrivateRoute>

              <Footer />
            </>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <>
              <PrivateRoute>
                <Cart />
              </PrivateRoute>

              <Footer />
            </>
          }
        />

        {/* DELIVERY */}
        <Route
          path="/delivery"
          element={
            <>
              <PrivateRoute>
                <Delivery />
              </PrivateRoute>

              <Footer />
            </>
          }
        />

        {/* PRINTER DETAILS */}
        <Route
          path="/printers/:id"
          element={
            <>
              <PrivateRoute>
                <PrinterDetails />
              </PrivateRoute>

              <Footer />
            </>
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