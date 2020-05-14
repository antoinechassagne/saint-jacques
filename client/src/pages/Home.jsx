import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CookieManager from "../services/CookieManager";
import SearchSpots from "../components/search/SearchSpots";
import Loader from "../components/Loader";
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
      <div className="mb--l">
        <h2 className="mt--l">Vos spots favoris</h2>
        {loadingFavoriteSpots && <Loader />}
        {!loadingFavoriteSpots && !favoriteSpots.length && (
          <span>Aucun spots favoris.</span>
        )}
        {favoriteSpots.map((spot) => (
          <Link to={`${process.env.PUBLIC_URL}/spots/${spot.id}`}>
            <h4 className="d-block mt--m">{spot.name}</h4>
          </Link>
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
