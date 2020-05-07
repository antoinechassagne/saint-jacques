import React, { useState } from "react";
import ApiAuthentication from "../api/authentication";
import CookieManager from "../services/CookieManager";
import FormBase from "../components/form/FormBase";
import InputEmail from "../components/form/inputs/InputEmail";
import InputPassword from "../components/form/inputs/InputPassword";

const Login = () => {
  document.title = "Saint Jacques | Connexion";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const login = (credentials) => {
    setLoading(true);
    const { email, password } = credentials;
    ApiAuthentication.login({ email, password })
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

  const renderError = () => (
    <>
      {error ? (
        <span>Les identifiants saisis ne sont pas valides.</span>
      ) : (
        <></>
      )}
    </>
  );

  const renderForm = () => {
    return (
      <>
        {renderError()}
        <FormBase submit={(data) => login(data)} buttonLabel="Se connecter">
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
      </>
    );
  };

  const content = () => {
    if (loading) return <span>Chargement...</span>;
    return renderForm();
  };

  return (
    <section className="page page--login">
      <h1>Se connecter</h1>
      {content()}
    </section>
  );
};

export default Login;
