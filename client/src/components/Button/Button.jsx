import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

// eslint-disable-next-line react/prop-types
export const Button = ({ label, status, type, id, style, onClick }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "",
    status: status || "default",
    type: type || "primary",
  });

  // Modified onClick handler
  const handleClick = (event) => {
    if (onClick) {
      onClick(event); // Execute the onClick prop function
    }
  };

  return (
    <div
      id={id}
      className={`button ${state.status} ${state.type} `}
      onMouseLeave={() => {
        if (state.status !== "disabled") {
          dispatch("mouse_leave");
        }
      }}
      onMouseEnter={() => {
        if (state.status !== "disabled") {
          dispatch("mouse_enter");
        }
      }}
      onClick={handleClick}
      style={style}
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
  id: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  status: PropTypes.oneOf(["hover", "default", "disabled"]),
  type: PropTypes.oneOf(["primary", "secondary"]),
};
