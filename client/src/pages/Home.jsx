import React from "react";
import SearchSpots from "../components/search/SearchSpots";
import ApiSpots from "../api/spots";

const Home = () => {
  document.title = "Saint Jacques";

  return (
    <section className="page">
      <h1>Bienvenue sur Saint Jacques</h1>
      <SearchSpots label="Rechercher un spot" search={ApiSpots.searchSpot} />
    </section>
  );
};

export default Home;
