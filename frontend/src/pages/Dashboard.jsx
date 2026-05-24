import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { deleteCartridge, updateCartridge } from "../services/cartridge";
import "./Dashboard.css";

const Dashboard = () => {
  const [cartridges, setCartridges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCartridge, setSelectedCartridge] = useState(null);
  const [editCartridge, setEditCartridge] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartridges = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get("/cartridge");
        setCartridges(res.data);
      } catch (err) {
        console.log(err);
        setError("Unable to load cartridges.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartridges();
  }, []);

  const handleDetails = (cartridgeid) => {
    navigate(`/cartridges/${cartridgeid}`);
  };

  const handleUpdate = (id) => {
    setEditingId(id);
    setEditCartridge({
      brand: "",
      type: "",
      color: "",
      price: "",
      quantity: "",
      image: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCartridge((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateCartridge(editingId, editCartridge);
      setCartridges((prev) =>
        prev.map((c) => (c._id === editingId ? updated.cartridge || updated : c))
      );
      setEditCartridge(null);
      setEditingId(null);
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cartridge?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCartridge(id);
      setCartridges((prev) => prev.filter((c) => c._id !== id));
      if (selectedCartridge?._id === id) {
        setSelectedCartridge(null);
      }
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        {loading && <p className="dashboard-message">Loading cartridges...</p>}
        {error && <p className="dashboard-message dashboard-error">{error}</p>}

        {selectedCartridge && (
          <div className="dashboard-box">
            <h2>Cartridge Details</h2>
            <p><b>Brand:</b> {selectedCartridge.brand}</p>
            <p><b>Type:</b> {selectedCartridge.type}</p>
            <p><b>Color:</b> {selectedCartridge.color}</p>
            <p><b>Price:</b> {selectedCartridge.price} TND</p>
            <p><b>Quantity:</b> {selectedCartridge.quantity}</p>
            <button type="button" className="btn-neutral" onClick={() => setSelectedCartridge(null)}>
              Close
            </button>
          </div>
        )}

        {editCartridge && (
          <form onSubmit={handleEditSubmit} className="dashboard-box edit-form">
            <h2>Update Cartridge</h2>
            <input type="text" name="brand" value={editCartridge.brand} onChange={handleEditChange} placeholder="Brand" />
            <input type="text" name="type" value={editCartridge.type} onChange={handleEditChange} placeholder="Type" />
            <input type="text" name="color" value={editCartridge.color} onChange={handleEditChange} placeholder="Color" />
            <input type="number" name="price" value={editCartridge.price} onChange={handleEditChange} placeholder="Price" />
            <input type="number" name="quantity" value={editCartridge.quantity} onChange={handleEditChange} placeholder="Quantity" />
            <input type="text" name="image" value={editCartridge.image} onChange={handleEditChange} placeholder="Image URL" />

            <div className="edit-actions">
              <button type="submit" className="btn-primary">Save</button>
              <button type="button" className="btn-neutral" onClick={() => setEditCartridge(null)}>Cancel</button>
            </div>
          </form>
        )}

        <div className="dashboard-grid">
          {cartridges.map((c) => (
            <div className="dashboard-card" key={c._id}>
              <img
                src={
                  c.image ||
                  "https://media.vaping360.com/images/half-gram-cart-full-gram-cart-163726ee59.webp?imageType=Standard"
                }
                alt={c.brand}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPLBgnNFVgZBM5mtt_CvLSLvt_HZG4nfhg7A&s";
                }}
              />

              <div className="dashboard-card-body">
                <h4>{c.brand}</h4>
                <p>{c.type}</p>
                <p>{c.color}</p>
                <p className="price-line">{c.price} TND</p>
                <p>Qty: {c.quantity}</p>

                <div className="dashboard-actions">
                  <button type="button" className="btn-details" onClick={() => handleDetails(c._id)}>
                    Details
                  </button>
                  <button type="button" className="btn-update" onClick={() => handleUpdate(c._id)}>
                    Update
                  </button>
                  <button type="button" className="btn-delete" onClick={() => handleDelete(c._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;