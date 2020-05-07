import axios from "axios";
import CookieManager from "./CookieManager";
import routes from "../settings/routes";

const Api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://saint-jacques.herokuapp.com",
});

Api.interceptors.request.use(
  (config) => {
    const token = CookieManager.get("jwt");

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // User ins't authenticated
    if (error.response.status === 401) {
      // Delete the previous JWT
      CookieManager.delete("jwt");
      // Redirect user to login page
      window.location.replace(`${process.env.PUBLIC_URL}${routes.login.path}`);
    }
    // Resource doesn't exists
    if (error.response.status === 404) {
      // Redirect to 404 page
      window.location.replace(
        `${process.env.PUBLIC_URL}${routes.notFound.path}`
      );
    }

    return Promise.reject(error);
  }
);

export default Api;
