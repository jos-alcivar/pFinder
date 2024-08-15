import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

export const OptionCircle = ({ label, status }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "ALL",
    status: status || "default",
  });

  return (
    <div
      className={`optionCircle ${state.status} ${state.label}`}
      onMouseLeave={() => {
        state.status === "clicked-default" || state.status === "clicked-hover"
          ? dispatch("mouse_click")
          : dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        state.status === "clicked-default"
          ? dispatch("mouse_click_enter")
          : dispatch("mouse_enter");
      }}
      onClick={() => {
        state.status === "clicked-default" || state.status === "clicked-hover"
          ? dispatch("mouse_leave")
          : dispatch("mouse_click");
      }}
    >
      <div className="text-option">
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
        status: "clicked-default",
      };

    case "mouse_click_enter":
      return {
        ...state,
        status: "clicked-hover",
      };
  }

  return state;
}

OptionCircle.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
