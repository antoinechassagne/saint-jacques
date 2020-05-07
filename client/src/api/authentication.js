import Api from "../services/Api";

/**
 *
 * @param {Object} Credentials Should contains `email` and `password`
 */
const login = ({ email, password }) => Api.post("/signin", { email, password });

export default {
  login,
};
