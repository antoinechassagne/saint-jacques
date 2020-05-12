import React, { useState, useEffect } from "react";
import ButtonPrimary from "../buttons/ButtonPrimary";

const FormBase = (props) => {
  const [inputsData, setInputsData] = useState({});

  const inputChange = (input) => {
    const update = { ...inputsData };

    if (input.valid) {
      // Input is valid, we update
      update[input.name] = input;
    } else {
      // Input isn't valid, we remove its value and set valid to false
      delete update[input.name].value;
      update[input.name].valid = false;
    }
    setInputsData(update);
  };

  const handleSubmit = () => {
    const form = {};
    let error = false;

    Object.keys(inputsData).forEach((key) => {
      // If there is an error, skip
      if (error) return;

      // If an input isn't valid, set error to true
      if (!inputsData[key].valid) {
        error = true;
        return;
      }

      // If input has a value property, push it to final form object
      if (Object.prototype.hasOwnProperty.call(inputsData[key], "value")) {
        form[inputsData[key].name] = inputsData[key].value;
      }
    });
    console.log(form);
    if (!error) {
      props.submit(form);
    }
  };

  const children = React.Children.map(props.children, (child) => {
    // Inject inputChange function as props on every input
    if (!child) return undefined;
    return React.cloneElement(child, {
      inputChange,
    });
  }).filter((el) => el);

  useEffect(() => {
    // Register each input in state
    const inputs = {};
    props.children.forEach((child) => {
      if (!child) return;
      inputs[child.props.name] = {
        name: child.props.name,
        valid: child.props.required ? false : true,
        required: child.props.required ? true : false,
      };
    });
    setInputsData(inputs);
  }, [setInputsData]);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {children}
      <ButtonPrimary
        onClick={() => {
          handleSubmit();
        }}
      >
        {props.buttonLabel}
      </ButtonPrimary>
    </form>
  );
};

export default FormBase;
