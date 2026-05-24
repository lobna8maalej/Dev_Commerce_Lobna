import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getPrinters } from "../services/printers";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./HomeUser.css";

const HomeUser = () => {
  const { user } = useAuth();
  const [printers, setPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPrinters();
        setPrinters(data);
      } catch (error) {
        console.log(error);
        setError("Unable to load printers.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredPrinters = printers.filter((p) =>
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <Navbar />

      <div className="home-container">
        <div className="home-header">
          <div>
          </div>

          <input
            className="home-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search printer..."
          />
        </div>

        {loading && <p className="home-message">Loading printers...</p>}
        {error && <p className="home-message home-error">{error}</p>}

        <div className="home-grid">
          {filteredPrinters.map((p) => (
            <div className="home-card" key={p._id}>
              <div className="home-image-wrap">
                <img
                  src={p.image}
                  alt={p.brand}
                  className="home-image"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://www.zebra.com/content/dam/zebra_dam/global/zcom-web-production/web-production-photography/web005/healthcare-photography-website-patient-id-label-printing-16x9-3600.jpg.imgo.jpg";
                  }}
                />
              </div>

              <div className="home-card-body">
                <h4>{p.brand}</h4>
                <p>{p.model}</p>
                <p className="home-price">{p.price} TND</p>

                <button
                  className="home-btn"
                  onClick={() => navigate(`/printers/${p._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeUser;