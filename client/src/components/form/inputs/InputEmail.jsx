import React, { useState, useEffect } from "react";

const InputEmail = (props) => {
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
    const pattern = new RegExp("[^@]+@[^.]+..+");
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
        type="email"
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
        <span className="error">Veuillez saisir une adresse email valide.</span>
      )}
    </div>
  );
};

export default InputEmail;
