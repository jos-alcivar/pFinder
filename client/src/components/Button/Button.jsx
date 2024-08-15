import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

export const Button = ({ label, status, type }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "",
    status: status || "default",
    type: type || "primary",
  });

  return (
    <div
      className={`button ${state.status} ${state.type}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="text-button">
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
  }

  return state;
}

Button.propTypes = {
  label: PropTypes.string,
  status: PropTypes.oneOf(["hover", "default"]),
  type: PropTypes.oneOf(["primary", "secondary"]),
};
