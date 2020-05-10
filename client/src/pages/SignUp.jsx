import React, { useState } from "react";
import ApiAuthentication from "../api/authentication";
import CookieManager from "../services/CookieManager";
import FormBase from "../components/form/FormBase";
import InputEmail from "../components/form/inputs/InputEmail";
import InputPassword from "../components/form/inputs/InputPassword";

const SignUp = () => {
  document.title = "Saint Jacques | S'inscrire";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [identicalPasswords, setIdenticalPasswords] = useState(true);

  // Sign up function executed when form is submitted
  const signUp = (credentials) => {
    const { email, password, passwordConfirmation } = credentials;

    // Check if passwords are identicals
    if (password !== passwordConfirmation) {
      setIdenticalPasswords(false);
      return;
    }

    setIdenticalPasswords(true);
    setLoading(true);

    ApiAuthentication.signUp({ email, password })
      .then(() => {
        // Once the user has been registered,
        // we need to sign in
        ApiAuthentication.login({ email, password })
          .then((response) => {
            CookieManager.set("jwt", response.data.token);
            window.location.replace(`${process.env.PUBLIC_URL}`);
          })
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <section className="page page--login">
      <h1>S'inscrire</h1>
      {error && (
        <span className="error">
          Les identifiants saisis ne sont pas valides. Il se peut que l'adresse
          email saisie soit déjà associée à un compte.
        </span>
      )}
      <FormBase submit={(data) => signUp(data)} buttonLabel="S'inscrire">
        <InputEmail
          required={true}
          validation={true}
          name="email"
          label="Adresse email"
        />
        <InputPassword
          required={true}
          validation={true}
          name="password"
          label="Mot de passe"
        />
        <InputPassword
          required={true}
          name="passwordConfirmation"
          label="Conformation du mot de passe"
        />
        {!identicalPasswords && (
          <span className="error">
            Les mots de passe saisis ne sont pas identiques.
          </span>
        )}
        {loading && <span>Chargement...</span>}
      </FormBase>
    </section>
  );
};

export default SignUp;
