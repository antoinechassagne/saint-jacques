import React, { useState, useEffect } from "react";
import CookieManager from "../services/CookieManager";
import SearchSpots from "../components/search/SearchSpots";
import WavesChart from "../components/charts/WavesChart";
import ApiSpots from "../api/spots";
import ApiUsers from "../api/users";

const Home = () => {
  document.title = "Saint Jacques";

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
      <div>
        <h2 className="mt--l">Vos spots favoris</h2>
        {loadingFavoriteSpots && <span>Chargement...</span>}
        {!loadingFavoriteSpots && !favoriteSpots.length && (
          <span>Aucun spots favoris.</span>
        )}
        {favoriteSpots.map((spot) => (
          <>
            <h4 className="d-block mt--m">{spot.name}</h4>
            <WavesChart data={spot.weatherData} />
          </>
        ))}
      </div>
    );
  };

  return (
    <section>
      <h1>Bienvenue sur Saint Jacques</h1>
      <SearchSpots label="Rechercher un spot" search={ApiSpots.searchSpot} />
      {renderFavoriteSpots()}
    </section>
  );
};

export default Home;
