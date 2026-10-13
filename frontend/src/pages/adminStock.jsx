import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminStock.css";


const AdminStock = () => {
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const token=localStorage.getItem("token")
        const res = await api.get("/printers",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

        setPrinters(res.data);
      } catch (err) {
        console.error(
          "STOCK ERROR:",
          err.response?.data || err.message
        );
      }
    };

    fetchPrinters();
  }, []);

  const deletePrinter = async (id) => {
    try {
      await api.delete(`/printers/${id}`);

      setPrinters((prev) =>
        prev.filter((printer) => printer._id !== id)
      );
    } catch (err) {
      console.error(
        "DELETE ERROR:",
        err.response?.data || err.message
      );
    }
  };

  const updatePrinter = async (id, newStock) => {
    try {
      const res = await api.put(`/printers/${id}`, {
        stock: newStock,
      });

      setPrinters((prev) =>
        prev.map((printer) =>
          printer._id === id ? res.data : printer
        )
      );
    } catch (err) {
      console.error(
        "UPDATE ERROR:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="admin-stock">
      <h2>Gestion du stock</h2>

      {printers.map((printer) => (
        <div key={printer._id}>
          <span>
            {printer.brand} {printer.model}
            {" - "}
            Stock: {printer.stock}
          </span>

          <button
            onClick={() =>
              updatePrinter(
                printer._id,
                printer.stock + 1
              )
            }
          >
            +1
          </button>

          <button
            onClick={() =>
              updatePrinter(
                printer._id,
                Math.max(0, printer.stock - 1)
              )
            }
          >
            -1
          </button>

          <button
            onClick={() =>
              deletePrinter(printer._id)
            }
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminStock;