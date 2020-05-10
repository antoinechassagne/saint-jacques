import Api from "../services/Api";

/**
 * @returns {Promise} HTTP Reponse
 */
const fetchUserFavoriteSpots = () => Api.get("/users/favorite-spots");

/**
 * @param {Number} id The spot id
 * @returns {Promise} HTTP Reponse
 */
const addFavoriteSpot = (id) =>
  Api.get("/users/add-favorite-spot", {
    params: { spot: id },
  });

/**
 * @param {Number} id The spot id
 * @returns {Promise} HTTP Reponse
 */
const removeFavoriteSpot = (id) =>
  Api.get("/users/remove-favorite-spot", {
    params: { spot: id },
  });

export default {
  fetchUserFavoriteSpots,
  addFavoriteSpot,
  removeFavoriteSpot,
};
