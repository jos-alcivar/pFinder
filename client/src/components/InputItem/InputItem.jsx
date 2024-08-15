import PropTypes from "prop-types";
import "./style.css";
import { InputText } from "../InputText";

export const InputItem = (props) => {
  return (
    <div className="input-dix">
      <div className="input-label">{props.label}</div>
      <InputText />
    </div>
  );
};

InputItem.propTypes = {
  label: PropTypes.string,
};
