import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiSpots from "../api/spots";
import ApiUsers from "../api/users";
import CookieManager from "../services/CookieManager";
import routes from "../settings/routes";

const Spot = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingAddFavorite, setLoadingAddFavorite] = useState(false);
  const [errorAddFavorite, setErrorAddFavorite] = useState(false);
  const [spot, setSpot] = useState(null);

  const params = useParams();

  const fetchSpot = () => {
    ApiSpots.fetchSpot(params.id)
      .then(({ data }) => {
        setSpot(data);
        // @TODO Handle isFavorite state based on flag send in spot response
        setIsFavorite(false);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const toggleFavoriteSpot = () => {
    setErrorAddFavorite(true);
    setLoadingAddFavorite(true);
    const method = isFavorite ? "removeFavoriteSpot" : "addFavoriteSpot";
    ApiUsers[method](params.id)
      .then(() => {
        setLoadingAddFavorite(false);
      })
      .catch(() => {
        setErrorAddFavorite(true);
        setLoadingAddFavorite(false);
      });
  };

  const AddFavoriteSpotButton = () => {
    const isLogged = CookieManager.get("jwt") ? true : false;

    if (!isLogged) {
      return (
        <div>
          <span>Connectez-vous pour ajouter ce spot à vos favoris</span>
          <button
            onClick={() => {
              window.location.replace(
                `${process.env.PUBLIC_URL}${routes.login.path}`
              );
            }}
          >
            Se connecter
          </button>
        </div>
      );
    }

    return (
      <button onClick={() => toggleFavoriteSpot()}>
        {isFavorite ? "Retirer de mes favoris" : "Ajouter à mes favoris"}
      </button>
    );
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
        {AddFavoriteSpotButton()}
      </>
    );
  };

  return <section className="page">{content()}</section>;
};

export default Spot;