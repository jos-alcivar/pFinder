import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";
import CustomIconLoader from "../CustomIconLoader/CustomIconLoader";

export const TabItem = ({
  label = "",
  status = "default",
  type = "unselected",
  onClick,
}) => {
  const [state, dispatch] = useReducer(reducer, { label, status, type });

  const handleMouseLeave = () => {
    dispatch("mouse_leave");
  };

  const handleMouseEnter = () => {
    dispatch("mouse_enter");
  };

  const handleClick = (event) => {
    dispatch(state.type === "unselected" ? "mouse_select" : "mouse_unselect");
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={`buttonTab-ctn ${state.status}`}>
      <div
        className={`buttonTab ${state.type} ${state.label} ${state.status}`}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        <CustomIconLoader label={state.label} size="20px" />
      </div>
      <div className={`text-button ${state.type} ${state.status}`}>
        <>{state.label}</>
      </div>
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

TabItem.propTypes = {
  label: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};
