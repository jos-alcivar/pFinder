import PropTypes from "prop-types";
import { useState } from "react";
import "./style.css";

export const InputText = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    props.onChange(e);

    if (value) {
      if (props.options) {
        const filteredSuggestions = props.options
          .filter((option) =>
            option.toLowerCase().startsWith(value.toLowerCase())
          )
          .slice(0, 3);
        setSuggestions(filteredSuggestions);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Update the input value and clear suggestions
    props.onChange({ target: { name: props.name, value: suggestion } });
    setSuggestions([]);
    setIsFocused(false); // Optionally, blur the input after selection
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        onChange={handleInputChange}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        className={`input-text ${isFocused ? "active" : ""} ${
          props.disabled ? "disabled" : ""
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={props.disabled}
        required={props.required}
        autoComplete="on"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

InputText.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string), // Add options prop type
};
