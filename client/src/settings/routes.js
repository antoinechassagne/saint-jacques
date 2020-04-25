import Home from "../pages/Home";
import Login from "../pages/Login";
import Spots from "../pages/Spots";
import Spot from "../pages/Spot";

export default {
  home: {
    path: "/",
    label: "Accueil",
    component: Home,
    menu: true,
    guard: false,
  },
  spots: {
    path: "/spots",
    label: "Spots",
    component: Spots,
    menu: true,
    guard: false,
  },
  spot: {
    path: "/spots/:id",
    label: "Spot",
    component: Spot,
    menu: false,
    guard: false,
  },
  login: {
    path: "/login",
    label: "Se connecter",
    component: Login,
    menu: true,
    guard: false,
  },
};
