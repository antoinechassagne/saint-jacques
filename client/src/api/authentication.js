import Api from "../services/Api";

/**
 * Ask for a Json Web Token
 *
 * @param {Object} Credentials Should contains `email` and `password`
 * @returns {Promise} HTTP Response
 */
const signIn = ({ email, password }) =>
  Api.post("/signin", { email, password });

/**
 * Register the user
 *
 * @param {Object} Credentials Should contains `email` and `password`
 * @returns {Promise} HTTP Reponse
 */
const signUp = ({ email, password }) =>
  Api.post("/signup", { email, password });

export default {
  signIn,
  signUp,
};
