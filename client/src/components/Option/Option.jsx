import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

export const Option = ({ label, status }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "onSite",
    status: status || "default",
  });

  return (
    <div
      className={`option ${state.status} ${state.label}`}
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

Option.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
