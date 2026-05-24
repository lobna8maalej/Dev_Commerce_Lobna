import { useEffect, useState } from "react";
import axios from "axios";

const CartridgeDashboard = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    type: "",
    price: "",
    image: ""
  });

  const [cartridges, setCartridges] = useState([]);
  const [editId, setEditId] = useState(null);

  const getCartridges = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/cartridge");
      setCartridges(res.data);
    } catch (error) {
      console.error("Error loading cartridges:", error);
    }
  };

  useEffect(() => {
    getCartridges();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      brand: "",
      model: "",
      type: "",
      price: "",
      image: ""
    });
  };

  const createCartridge = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/cartridge", {
        ...form,
        price: Number(form.price)
      });
      getCartridges();
      resetForm();
    } catch (error) {
      console.error("Error creating cartridge:", error);
    }
  };

  const updateCartridge = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/cartridge/${id}`, form);
      getCartridges();
      setEditId(null);
    } catch (error) {
      console.error("Error updating cartridge:", error);
    }
  };

  const deleteCartridge = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/cartridge/${id}`);
      getCartridges();
    } catch (error) {
      console.error("Error deleting cartridge:", error);
    }
  };

  const editCartridge = (c) => {
    setEditId(c._id);
    setForm({
      brand: c.brand || "",
      model: c.model || "",
      type: c.type || "",
      price: c.price || "",
      image: c.image || ""
    });
  };

  return (
    <div>
      <form onSubmit={editId ? updateCartridge : createCartridge}>
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" />
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image" />

        {editId ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Create</button>
        )}
      </form>

      {cartridges.map((c) => (
        <div key={c._id}>
          <h3>{c.brand}</h3>
          <p>{c.model}</p>
          <p>{c.type}</p>
          <button onClick={() => editCartridge(c)}>Edit</button>
          <button onClick={() => deleteCartridge(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CartridgeDashboard;