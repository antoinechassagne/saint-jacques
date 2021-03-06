import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiSpots from "../api/spots";
import ApiUsers from "../api/users";
import CookieManager from "../services/CookieManager";
import routes from "../settings/routes";
import Loader from "../components/Loader";
import WavesChart from "../components/charts/WavesChart";
import PeriodChart from "../components/charts/PeriodChart";
import TempChart from "../components/charts/TempChart";

const Spot = () => {
  document.title = "Saint Jacques | Chargement...";

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
        document.title = `Saint Jacques | ${data.name}`;
        setSpot(data);
        setIsFavorite(data.isFavorite);
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
        setIsFavorite(!isFavorite);
      })
      .catch(() => {
        setErrorAddFavorite(true);
        setLoadingAddFavorite(false);
      });
  };

  useEffect(() => {
    fetchSpot();
  }, []);

  const AddFavoriteSpotButton = () => {
    const isLogged = CookieManager.get("jwt") ? true : false;

    if (!isLogged) {
      return (
        <div className="mt--m">
          <span>Connectez-vous pour ajouter ce spot à vos favoris</span>
          <a
            className="ml--s link"
            onClick={() => {
              window.location.replace(
                `${process.env.PUBLIC_URL}${routes.signIn.path}`
              );
            }}
          >
            Se connecter
          </a>
        </div>
      );
    }

    return (
      <button onClick={() => toggleFavoriteSpot()} className="mt--l">
        {isFavorite ? "Retirer de mes favoris" : "Ajouter à mes favoris"}
      </button>
    );
  };

  const content = () => {
    if (loading) return <Loader />;
    if (error) return <span>Une erreur est survenue.</span>;
    return (
      <section>
        <h1>{spot.name}</h1>
        <span className="d-block mb--xs">Longitude : {spot.longitude}</span>
        <span className="d-block mb--xs">Latitude : {spot.latitude}</span>
        <p>{spot.description}</p>
        {AddFavoriteSpotButton()}
        <div className="mt--l">
            <WavesChart data={spot.wavewatchData} width={700} height={200} />
            <PeriodChart data={spot.wavewatchData} width={700} height={200} />
            <TempChart data={spot.gfsData} width={700} height={200} />
        </div>

      </section>
    );
  };

  return <section className="page">{content()}</section>;
};

export default Spot;
