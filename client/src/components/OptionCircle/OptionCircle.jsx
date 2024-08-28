import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";
import "./style.css";

export const OptionCircle = ({
  label = "",
  status = "default",
  type = "unselected",
  onTypeChange,
}) => {
  const [state, dispatch] = useReducer(reducer, { status, type });

  useEffect(() => {
    dispatch({ type: "set_type", newType: type });
  }, [type]);

  const handleMouseLeave = () => {
    dispatch({ type: "mouse_leave" });
  };

  const handleMouseEnter = () => {
    dispatch({ type: "mouse_enter" });
  };

  const handleClick = () => {
    if (state.type !== "selected") {
      onTypeChange();
    }
  };

  return (
    <div
      className={`optionCircle ${state.type} ${state.status}`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className="text-option">{label}</div>
    </div>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "mouse_enter":
      return { ...state, status: "hover" };

    case "mouse_leave":
      return { ...state, status: "default" };

    case "set_type":
      return { ...state, type: action.newType };

    default:
      return state;
  }
}

OptionCircle.propTypes = {
  label: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
  onTypeChange: PropTypes.func,
};
