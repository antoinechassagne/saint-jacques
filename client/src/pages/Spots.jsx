import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiSpots from "../api/spots";
import Loader from "../components/Loader";

const Spots = () => {
  document.title = "Saint Jacques | Spots";

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSpots = () => {
    ApiSpots.fetchSpots()
      .then(({ data }) => {
        setSpots(data["hydra:member"]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  const renderSpots = () => (
    <ul>
      {spots.map((spot, index) => (
        <li key={index}>
          <Link to={`${process.env.PUBLIC_URL}/spots/${spot.id}`}>
            <h2>{spot.name}</h2>
          </Link>
          <p className="d-block mb--l">{spot.description}</p>
        </li>
      ))}
    </ul>
  );

  const content = () => {
    if (loading) return <Loader />;
    if (error) return <span>Une erreur est survenue.</span>;
    if (!spots.length) return <span>Aucun spot trouvé.</span>;
    return renderSpots();
  };

  return (
    <section>
      <h1>Tous les spots</h1>
      {content()}
    </section>
  );
};

export default Spots;
