import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import routes from "../settings/routes";
import ApiAuthentication from "../api/authentication";
import CookieManager from "../services/CookieManager";
import FormBase from "../components/form/FormBase";
import InputEmail from "../components/form/inputs/InputEmail";
import InputPassword from "../components/form/inputs/InputPassword";

const SignIn = () => {
  document.title = "Saint Jacques | Se connecter";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signIn = (credentials) => {
    setLoading(true);
    const { email, password } = credentials;
    ApiAuthentication.signIn({ email, password })
      .then((response) => {
        if (response.status === 200) {
          CookieManager.set("jwt", response.data.token);
          window.location.replace(`${process.env.PUBLIC_URL}`);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <section className="page page--sign-in">
      <h1>Se connecter</h1>
      {error && (
        <span class="error">Les identifiants saisis ne sont pas valides.</span>
      )}
      <FormBase submit={(data) => signIn(data)} buttonLabel="Se connecter">
        <InputEmail
          required={true}
          validation={true}
          name="email"
          label="Email"
        />
        <InputPassword
          required={true}
          validation={false}
          name="password"
          label="Mot de passe"
        />
      </FormBase>
      {loading && <span>Chargement...</span>}
      <span>Vous n'avez pas encore de compte ? </span>
      <NavLink
        exact={true}
        to={`${process.env.PUBLIC_URL}${routes.signUp.path}`}
      >
        Créez en un dès maintenant !
      </NavLink>
    </section>
  );
};

export default SignIn;
