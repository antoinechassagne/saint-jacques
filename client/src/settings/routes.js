import Home from "../pages/Home";
import Login from "../pages/Login";
import Spots from "../pages/Spots";
import Spot from "../pages/Spot";
import NotFound from "../pages/NotFound";

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
    menu: false,
    guard: false,
  },
  notfound: {
    path: "/404",
    label: "Erreur 404",
    component: NotFound,
    menu: false,
    guard: false,
  },
};
