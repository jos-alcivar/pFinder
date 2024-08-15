import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";
import { IconPieChart } from "icons";

export const TabItem = ({ label, status, type }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "default",
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
      <IconPieChart size="24" />
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

TabItem.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["hover", "default"]),
  type: PropTypes.oneOf(["primary", "secondary"]),
};
