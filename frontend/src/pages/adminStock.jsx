import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStock = () => {
  const [printers, setPrinters] = useState([]);
  const token = localStorage.getItem("token");

  // Charger les imprimantes
  useEffect(() => {
    axios.get("http://localhost:3000/api/printers", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPrinters(res.data))
    .catch(err => console.error(err));
  }, []);

  // Supprimer une imprimante
  const deletePrinter = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/printers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPrinters(printers.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Mettre à jour une imprimante
  const updatePrinter = async (id, newStock) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/printers/${id}`,
        { stock: newStock },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrinters(printers.map(p => p._id === id ? res.data : p));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Gestion du stock (Admin)</h2>
      <ul>
        {printers.map(p => (
          <li key={p._id}>
            {p.brand} {p.model} - Stock: {p.stock}
            <button onClick={() => updatePrinter(p._id, p.stock + 1)}>+1</button>
            <button onClick={() => deletePrinter(p._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminStock;
