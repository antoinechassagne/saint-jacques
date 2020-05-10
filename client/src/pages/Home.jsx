import React, { useState, useEffect } from "react";
import CookieManager from "../services/CookieManager";
import SearchSpots from "../components/search/SearchSpots";
import ApiSpots from "../api/spots";
import ApiUsers from "../api/users";

document.title = "Saint Jacques";

const Home = () => {
  const [favoriteSpots, setFavoriteSpots] = useState([]);
  const [loadingFavoriteSpots, setLoadingFavoriteSpots] = useState(true);
  const [errorFavoriteSpots, setErrorFavoriteSpots] = useState(false);

  const isLogged = CookieManager.get("jwt") ? true : false;

  const fetchUserFavoriteSpots = () => {
    setLoadingFavoriteSpots(true);
    if (isLogged) {
      ApiUsers.fetchUserFavoriteSpots()
        .then(({ data }) => {
          setLoadingFavoriteSpots(false);
          setFavoriteSpots(data);
        })
        .catch(() => {
          setErrorFavoriteSpots(true);
          setLoadingFavoriteSpots(false);
        });
    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchUserFavoriteSpots();
    }
  }, []);

  const renderFavoriteSpots = () => {
    if (!isLogged) return;

    return (
      <div className="favorite-spots">
        <h3>Spots favoris</h3>
        {loadingFavoriteSpots && <span>Chargement...</span>}
        {!loadingFavoriteSpots && !favoriteSpots.length && (
          <span>Aucun spots favoris.</span>
        )}
        {favoriteSpots.map((spot) => (
          <h4>{spot.name}</h4>
        ))}
      </div>
    );
  };

  return (
    <section className="page">
      <h1>Bienvenue sur Saint Jacques</h1>
      <SearchSpots label="Rechercher un spot" search={ApiSpots.searchSpot} />
      {renderFavoriteSpots()}
    </section>
  );
};

export default Home;
