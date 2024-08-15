import PropTypes from "prop-types";
import { useState } from "react";
import "./style.css";

export const InputText = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      type="text"
      className={`input-text  ${isFocused ? "active" : ""} ${
        props.disabled ? "disabled" : ""
      }`}
      placeholder=" By filter name"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={props.disabled}
    />
  );
};

InputText.propTypes = {
  disabled: PropTypes.bool,
};
