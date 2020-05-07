import Api from "../services/Api";

/**
 * @param {Number} id The spot id
 * @returns {Promise} HTTP Reponse
 */
const addFavoriteSpot = (id) =>
  Api.get("/users/add-favorite-spot", {
    params: { spot: id },
  });

export default {
  addFavoriteSpot,
};
