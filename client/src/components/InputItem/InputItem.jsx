import PropTypes from "prop-types";
import "./style.css";
import { InputText } from "../InputText";

export const InputItem = (props) => {
  return (
    <div className="input-div">
      <div className="input-label">{props.label}</div>
      <InputText
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        disabled={props.disabled}
        required={props.required}
      />
    </div>
  );
};

InputItem.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};
