import Api from "../services/Api";

/**
 * @returns {Promise} HTTP Reponse
 */
const fetchSpots = () => Api.get("/spots");

/**
 * @param {Number} id Spot id
 * @returns {Promise} HTTP Response
 */
const fetchSpot = (id) => Api.get(`/spots/${id}`);

/**
 * @param {String} term The term sought
 * @returns {Promise} HTTP Reponse
 */
const searchSpot = (term) =>
  Api.get("/search/spots", {
    params: { search: term },
  });

export default {
  fetchSpots,
  fetchSpot,
  searchSpot,
};
