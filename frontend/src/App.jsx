import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HomeUser from "./pages/HomeUser";
import Cartridges from "./pages/cartridge";
import PrivateRoute from "./home/privateRoutes";
import Printers from "./pages/printers";

import CartridgeDetails from "./pages/CartridgeDetails";
import PrinterDetails from "./pages/PrinterDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<HomeUser />} />
          <Route path="/printers" element={<Printers />} />
          <Route path="/cartridges" element={<Cartridges />} />
          <Route path="/cartridges/:id" element={<CartridgeDetails />} />
          <Route path="/printers/:id" element={<PrinterDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;