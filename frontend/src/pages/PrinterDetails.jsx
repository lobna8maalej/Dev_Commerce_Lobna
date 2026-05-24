import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOnePrinter } from "../services/printers";
import "./PrinterDetails.css";

const PrinterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [printer, setPrinter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOnePrinter(id);
        setPrinter(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) return <p className="details-loading">Loading...</p>;
  if (!printer) return <p className="details-loading">Printer not found</p>;

  return (
    <div className="details-page">
      <div className="details-card">
        <div className="details-image-wrap">
          <img
            src={printer.image}
            alt={printer.brand}
            className="details-image"
          />
        </div>

        <div className="details-content">
          <h2>{printer.brand}</h2>
          <p className="details-subtitle">{printer.model}</p>

          <div className="details-info">
            <p><span>Price:</span> {printer.price} TND</p>
            <p><span>Stock:</span> {printer.stock}</p>
          </div>

          <button className="details-btn" onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrinterDetails;