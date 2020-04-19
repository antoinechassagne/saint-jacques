import React, { useState } from "react";
import Api from "../services/Api";
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

    Api.post("/login", { body: { email, password } })
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
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
        <FormBase submit={(data) => login(data)}>
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
