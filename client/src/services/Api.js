import axios from "axios";
import cookieManager from "./CookieManager";
import routes from "../settings/routes";

const Api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://saint-jacques.herokuapp.com",
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // User ins't authenticated
    if (error.response.status === 401) {
      // Delete the previous JWT
      cookieManager.delete("jwt");
      // Redirect user to login page
      window.location.replace(`${process.env.PUBLIC_URL}${routes.login.path}`);
    }

    return Promise.reject(error);
  }
);

export default Api;
