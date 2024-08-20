import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

export const OptionCircle = ({
  label = "",
  status = "default",
  type = "unselected",
  onTypeChange,
}) => {
  const [state, dispatch] = useReducer(reducer, { label, status, type });

  const handleMouseLeave = () => {
    dispatch("mouse_leave");
    onTypeChange && onTypeChange(state.type);
  };

  const handleMouseEnter = () => {
    dispatch("mouse_enter");
    onTypeChange && onTypeChange(state.type);
  };

  const handleClick = () => {
    dispatch(state.type === "unselected" ? "mouse_select" : "mouse_unselect");
    onTypeChange && onTypeChange(state.type);
  };

  return (
    <div
      className={`optionCircle ${state.type} ${state.status} ${state.label}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className="text-option">{state.label}</div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return { ...state, status: "hover" };

    case "mouse_leave":
      return { ...state, status: "default" };

    case "mouse_select":
      return { ...state, type: "selected" };

    case "mouse_unselect":
      return { ...state, type: "unselected" };

    default:
      return state;
  }
}

OptionCircle.propTypes = {
  label: PropTypes.string,
  status: PropTypes.string,
  onTypeChange: PropTypes.func,
  type: PropTypes.string,
};
