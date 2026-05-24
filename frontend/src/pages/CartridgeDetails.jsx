import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getOneCartridge, updateCartridge } from "../services/cartridge";
import "./CartridgeDetails.css";

const CartridgeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cartridge, setCartridge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showLinkPrinter, setShowLinkPrinter] = useState(false);
  const [printerId, setPrinterId] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    brand: "",
    type: "",
    color: "",
    price: "",
    quantity: "",
    image: ""
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOneCartridge(id);
        setCartridge(data);
        setForm(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateCartridge(id, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      });

      setCartridge(updated.cartridge || updated);
      setIsEditing(false);
      setMessage("Cartridge updated successfully");
    } catch (error) {
      console.log(error);
      setMessage("Error updating cartridge");
    }
  };

  const handleLinkPrinter = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cartridge/${id}/link-printer`,
        { printerId }
      );

      setCartridge(response.data.cartridge);
      setPrinterId("");
      setShowLinkPrinter(false);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Error linking printer");
    }
  };

  if (loading) return <p className="details-loading">Loading...</p>;
  if (!cartridge) return <p className="details-loading">Cartridge not found</p>;

  return (
    <div className="details-page">
      <div className="details-card">
        <div className="details-image-wrap">
          <img
            src={cartridge.image}
            alt={cartridge.brand}
            className="details-image"
          />
        </div>

        <div className="details-content">
          <h2>Cartridge Details</h2>

          <div className="details-info">
            <p><span>Brand:</span> {cartridge.brand}</p>
            <p><span>Type:</span> {cartridge.type}</p>
            <p><span>Color:</span> {cartridge.color}</p>
            <p><span>Price:</span> {cartridge.price} TND</p>
            <p><span>Quantity:</span> {cartridge.quantity}</p>
          </div>

          {message && <p className="details-message">{message}</p>}

          <div className="details-actions">
            <button
              className="details-btn update-btn"
              onClick={() => {
                setIsEditing(true);
                setShowLinkPrinter(false);
              }}
            >
              Update Cartridge
            </button>

            <button
              className="details-btn update-btn"
              onClick={() => {
                setShowLinkPrinter(true);
                setIsEditing(false);
              }}
            >
              Link Printer
            </button>

            <button
              className="details-btn close-btn"
              onClick={() => navigate(-1)}
            >
              Close
            </button>
          </div>

          {isEditing && (
            <form className="update-card" onSubmit={handleSubmit}>
              <h3>Update Cartridge</h3>

              <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
              <input name="type" value={form.type} onChange={handleChange} placeholder="Type" />
              <input name="color" value={form.color} onChange={handleChange} placeholder="Color" />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
              <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
              <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />

              <div className="update-actions">
                <button type="submit" className="save-btn">Save</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {showLinkPrinter && (
            <div className="update-card">
              <h3>Link Printer</h3>

              <input
                type="text"
                placeholder="Printer ID"
                value={printerId}
                onChange={(e) => setPrinterId(e.target.value)}
              />

              <div className="update-actions">
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleLinkPrinter}
                >
                  Link
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowLinkPrinter(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartridgeDetails;