import PropTypes from "prop-types";
import { useReducer } from "react";
import { ChevronDown } from "./ChevronDown";
import { IconComponentNode } from "./IconComponentNode";
import "./style.css";

export const Filter = ({ label, status }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "default",
    status: status || "default",
  });

  return (
    <div
      className={`filter ${state.status} ${state.label}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="filter-text">filter</div>
      {["clicked-default", "clicked-hover", "default"].includes(
        state.status
      ) && <ChevronDown className="chevron-down" />}

      {state.status === "hover" && (
        <IconComponentNode className="chevron-down" />
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.status === "default") {
    switch (action) {
      case "mouse_enter":
        return {
          status: "hover",
        };
    }
  }

  if (state.status === "hover") {
    switch (action) {
      case "mouse_leave":
        return {
          status: "default",
        };
    }
  }

  if (state.status === "clicked-default") {
    switch (action) {
      case "mouse_enter":
        return {
          status: "clicked-hover",
        };
    }
  }

  if (state.status === "clicked-hover") {
    switch (action) {
      case "mouse_leave":
        return {
          status: "clicked-default",
        };
    }
  }

  return state;
}

Filter.propTypes = {
  label: PropTypes.oneOf([]),

  status: PropTypes.oneOf([
    "clicked-default",
    "clicked-hover",
    "hover",
    "default",
  ]),
};
