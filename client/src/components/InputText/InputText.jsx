import PropTypes from "prop-types";
import { useState } from "react";
import "./style.css";

export const InputText = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      className={`input-text  ${isFocused ? "active" : ""} ${
        props.disabled ? "disabled" : ""
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={props.disabled}
      required={props.required}
    />
  );
};

InputText.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};
