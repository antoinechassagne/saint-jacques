import React, { useState, useEffect } from "react";
import Api from "../services/Api";

const Spots = () => {
  document.title = "Saint Jacques | Spots";

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSpots = () => {
    Api.get("/spots")
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
          <h3>{spot.name}</h3>
          <span>Longitude : {spot.longitude}</span>
          <span>Latitude : {spot.longitude}</span>
          <p>{spot.description}</p>
        </li>
      ))}
    </ul>
  );

  const content = () => {
    if (loading) return <span>Chargement...</span>;
    if (error) return <span>Une erreur est survenue.</span>;
    if (!spots.length) return <span>Aucun spot trouvé.</span>;
    return renderSpots();
  };

  return (
    <section className="page">
      <h1>Tous les spots</h1>
      {content()}
    </section>
  );
};

export default Spots;
