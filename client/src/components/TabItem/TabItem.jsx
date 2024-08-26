import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";
import CustomIconLoader from "../CustomIconLoader/CustomIconLoader";

export const TabItem = ({ label, status, onClick }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "",
    status: status || "default",
  });

  const changeClickStatus = () => {
    if (state.status !== "disabled") {
      state.status === "clicked" || state.status === "clicked-hover"
        ? dispatch("mouse_leave")
        : dispatch("mouse_click");
    }
  };

  const handleClick = (event) => {
    changeClickStatus();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={`buttonTab-ctn ${state.status}`}>
      <div
        className={`buttonTab ${state.label} ${state.status}`}
        onMouseLeave={() => {
          if (state.status !== "disabled") {
            state.status === "clicked" || state.status === "clicked-hover"
              ? dispatch("mouse_click")
              : dispatch("mouse_leave");
          }
        }}
        onMouseEnter={() => {
          if (state.status !== "disabled") {
            state.status === "clicked"
              ? dispatch("mouse_click_enter")
              : dispatch("mouse_enter");
          }
        }}
        onClick={handleClick}
      >
        <CustomIconLoader label={state.label} size="20px" />
      </div>
      <div className={`text-button ${state.status}`}>
        <>{state.label}</>
      </div>
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        status: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        status: "default",
      };
    case "mouse_click":
      return {
        ...state,
        status: "clicked",
      };

    case "mouse_click_enter":
      return {
        ...state,
        status: "clicked-hover",
      };
  }

  return state;
}

TabItem.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  status: PropTypes.oneOf(["hover", "default", "clicked", "disabled"]),
};
