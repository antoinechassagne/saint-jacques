import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
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
  signIn: {
    path: "/sign-in",
    label: "Se connecter",
    component: SignIn,
    menu: false,
    guard: false,
  },
  signUp: {
    path: "/sign-up",
    label: "S'inscrire'",
    component: SignUp,
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
