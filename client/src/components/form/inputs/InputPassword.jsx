import React, { useState, useEffect } from "react";

const InputPassword = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [valid, setValid] = useState(true);
  const [disableValidation, setDisableValidation] = useState(true);

  const validation = () => {
    // Skip validation if validation prop is set to false
    if (!props.validation) return;

    // Skip validation when user is writing for the first time
    if (disableValidation) return;

    // Case where value is empty but required
    if (props.required && !inputValue) {
      setValid(false);
      return;
    }

    // Regex validation
    const pattern = new RegExp(
      "^.*(?=.{8,})((?=.*[!@#$%^&*()-_=+{};:,<.>]){1})(?=.*d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$"
    );
    const validValue = inputValue.match(pattern);
    setValid(validValue ? true : false);
  };

  useEffect(() => {
    // Validation
    if (!disableValidation) {
      validation();
    }

    // Send to parent
    props.inputChange({
      name: props.name,
      value: inputValue,
      valid,
      required: props.required,
    });
  }, [disableValidation, inputValue, valid]);

  return (
    <div className="input">
      <label className="input__label" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className="input__input"
        type="password"
        value={inputValue}
        name={props.name}
        required={props.required}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => {
          // Enable validation on the first blur
          if (disableValidation) {
            setDisableValidation(false);
            return;
          }
          setInputValue(e.target.value);
        }}
      />
      {!valid && (
        <p className="error">
          Le mot de passe doit contenir au moins 8 caractères (dont au moins une
          majuscule, une minuscule, un chiffre et un caractère spécial).
        </p>
      )}
    </div>
  );
};

export default InputPassword;
