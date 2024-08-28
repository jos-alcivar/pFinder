import PropTypes from "prop-types";
import { useReducer, useEffect } from "react";
import "./style.css";

export const FilterOption = ({
  label = "",
  status = "default",
  type = "unselected",
  onTypeChange,
  isEmpty = false, // Add the isEmpty prop with a default value
}) => {
  const [state, dispatch] = useReducer(reducer, { label, status, type });

  // Update the internal state when the `type` prop changes
  useEffect(() => {
    if (type === "selected") {
      dispatch("mouse_select");
    } else {
      dispatch("mouse_unselect");
    }
  }, [type]);

  const handleMouseLeave = () => {
    dispatch("mouse_leave");
  };

  const handleMouseEnter = () => {
    dispatch("mouse_enter");
  };

  const handleClick = () => {
    if (!isEmpty) {
      // Only change type if not empty
      dispatch("mouse_select");
      onTypeChange && onTypeChange("selected");
    } else {
      dispatch("mouse_unselect");
      onTypeChange && onTypeChange("unselected");
    }
  };

  return (
    <div
      className={`option ${state.type} ${state.status} ${state.label}`}
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

FilterOption.propTypes = {
  label: PropTypes.string,
  status: PropTypes.string,
  onTypeChange: PropTypes.func,
  type: PropTypes.string,
  isEmpty: PropTypes.bool, // Add prop type for isEmpty
};
