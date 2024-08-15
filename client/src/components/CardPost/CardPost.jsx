import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

export const CardPost = ({
  heading,
  label,
  location,
  model,
  experience,
  status,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    heading: heading || "Heading",
    label: label || "Label",
    location: location || "City, State, Country",
    model: model || "Work Model",
    experience: experience || "Experience",
    status: status || "default",
  });

  return (
    <div
      className="cardPost-ctn"
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="card-text-ctn">
        <div className="card-heading">
          <div className={`heading-text ${state.status}`}>{state.heading}</div>
        </div>
        <div className="card-label ">
          <div className="label-text">{state.label}</div>
        </div>
        <div className="card-info">
          <div className="card-row">
            <div className="info-text">{state.location}</div>
          </div>
          <div className="card-row">
            <div className="info-text">{state.model}</div>
            <div className="info-text">{state.experience}</div>
          </div>
        </div>
      </div>
      <div className="card-img-ctn"></div>
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

CardPost.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  location: PropTypes.string,
  model: PropTypes.string,
  experience: PropTypes.string,
  status: PropTypes.string,
};
