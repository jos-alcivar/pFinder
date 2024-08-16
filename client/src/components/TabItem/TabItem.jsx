import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";
import CustomIcons from "../CustomIcons/CustomIcons";

export const TabItem = ({ label, status }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "",
    status: status || "default",
  });

  return (
    <div className="buttonTab-ctn">
      <div
        className={`buttonTab`}
        onMouseLeave={() => {
          dispatch("mouse_leave");
        }}
        onMouseEnter={() => {
          dispatch("mouse_enter");
        }}
      >
        <CustomIcons className={`${state.status}`} label={state.label} />
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
  }

  return state;
}

TabItem.propTypes = {
  label: PropTypes.string,
  status: PropTypes.oneOf(["hover", "default", "disabled"]),
};
