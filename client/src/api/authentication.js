import Api from "../services/Api";

/**
 * @param {Object} Credentials Should contains `email` and `password`
 */
const login = ({ email, password }) => Api.post("/signin", { email, password });

/**
 *
 * @param {Object} Credentials Should contains `email` and `password`
 */
const signUp = ({ email, password }) =>
  Api.post("/signup", { email, password });

export default {
  login,
  signUp,
};
