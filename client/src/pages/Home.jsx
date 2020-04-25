import React from "react";
import SearchSpots from "../components/search/SearchSpots";
import Api from "../services/Api";

const Home = () => {
  document.title = "Saint Jacques";

  const searchSpots = (term) => {
    return Api.get("/spots/search", {
      params: { search: term },
    });
  };

  return (
    <section className="page">
      <h1>Bienvenue sur Saint Jacques</h1>
      <SearchSpots label="Rechercher un spot" search={searchSpots} />
    </section>
  );
};

export default Home;
