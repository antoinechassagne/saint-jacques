import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/Api";

const Spot = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [spot, setSpot] = useState(null);

  const params = useParams();

  const fetchSpot = () => {
    Api.get(`/spots/${params.id}`)
      .then(({ data }) => {
        setSpot(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSpot();
  }, []);

  const content = () => {
    if (loading) return <span>Chargement...</span>;
    if (error) return <span>Une erreur est survenue.</span>;
    return (
      <>
        <h1>{spot.name}</h1>
        <span>Longitude : {spot.longitude}</span>
        <span>Latitude : {spot.longitude}</span>
        <p>{spot.description}</p>
      </>
    );
  };

  return <section className="page">{content()}</section>;
};

export default Spot;
