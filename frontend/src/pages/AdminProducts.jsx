import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminProducts.css";

const AdminProducts = () => {
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingPrinter, setEditingPrinter] = useState(null);

  useEffect(() => {
    fetchPrinters();
  }, []);

  const fetchPrinters = async () => {
    try {
      const res = await api.get("/printers");
      setPrinters(res.data);
    } catch (err) {
      console.error(
        "PRODUCTS ERROR:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // SUPPRIMER
  const deletePrinter = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this printer?"
    );

    if (!confirmDelete) return;

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

      alert("Failed to delete printer.");
    }
  };

  // OUVRIR MODIFICATION
  const openEdit = (printer) => {
    setEditingPrinter({
      ...printer,
    });
  };

  // MODIFIER
  const updatePrinter = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(
        `/printers/${editingPrinter._id}`,
        {
          brand: editingPrinter.brand,
          model: editingPrinter.model,
          price: Number(editingPrinter.price),
          image: editingPrinter.image,
          description: editingPrinter.description,
        }
      );

      setPrinters((prev) =>
        prev.map((printer) =>
          printer._id === editingPrinter._id
            ? res.data
            : printer
        )
      );

      setEditingPrinter(null);

      alert("Printer updated successfully.");
    } catch (err) {
      console.error(
        "UPDATE ERROR:",
        err.response?.data || err.message
      );

      alert("Failed to update printer.");
    }
  };

  if (loading) {
    return (
      <div className="admin-products">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="admin-products">

      <div className="products-header">
        <div>
          <h2>Products</h2>
          <p>Manage your printer catalog</p>
        </div>
      </div>

      <div className="products-list">

        {printers.map((printer) => (
          <div
            className="product-card"
            key={printer._id}
          >

            <div className="product-image">
              <img
                src={printer.image}
                alt={`${printer.brand} ${printer.model}`}
              />
            </div>

            <div className="product-info">

              <h3>
                {printer.brand} {printer.model}
              </h3>

              <p>
                <strong>Brand:</strong> {printer.brand}
              </p>

              <p>
                <strong>Model:</strong> {printer.model}
              </p>

              <p>
                <strong>Price:</strong> {printer.price} TND
              </p>

              <p>
                <strong>Stock:</strong> {printer.stock}
              </p>

              {printer.description && (
                <p className="product-description">
                  {printer.description}
                </p>
              )}

            </div>

            <div className="product-actions">

              <button
                className="edit-btn"
                onClick={() => openEdit(printer)}
              >
                ✏️ Modifier
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deletePrinter(printer._id)
                }
              >
                🗑️ Supprimer
              </button>

            </div>

          </div>
        ))}

      </div>


      {/* =========================
          MODAL MODIFICATION
      ========================= */}

      {editingPrinter && (
        <div className="modal-overlay">

          <div className="edit-modal">

            <h2>Modifier le produit</h2>

            <form onSubmit={updatePrinter}>

              <label>Brand</label>

              <input
                type="text"
                value={editingPrinter.brand}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    brand: e.target.value,
                  })
                }
              />


              <label>Model</label>

              <input
                type="text"
                value={editingPrinter.model}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    model: e.target.value,
                  })
                }
              />


              <label>Price</label>

              <input
                type="number"
                value={editingPrinter.price}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    price: e.target.value,
                  })
                }
              />


              <label>Image URL</label>

              <input
                type="text"
                value={editingPrinter.image || ""}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    image: e.target.value,
                  })
                }
              />


              <label>Description</label>

              <textarea
                value={editingPrinter.description || ""}
                onChange={(e) =>
                  setEditingPrinter({
                    ...editingPrinter,
                    description: e.target.value,
                  })
                }
              />


              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setEditingPrinter(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminProducts;