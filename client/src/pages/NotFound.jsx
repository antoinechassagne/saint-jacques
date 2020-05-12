import React from "react";

const NotFound = () => {
  document.title = "Saint Jacques | 404";

  return (
    <section>
      <h1>Erreur 404</h1>
      <p>
        Cette pas n'existe pas...{" "}
        <span role="img" aria-label="Sad face emoji">
          😞
        </span>
      </p>
    </section>
  );
};

export default NotFound;
