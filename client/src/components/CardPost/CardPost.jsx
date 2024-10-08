import PropTypes from "prop-types";
import { calculateInterval } from "../../utils/date.helpers";
import { useReducer } from "react";
import "./style.css";

export const CardPost = ({
  heading,
  label,
  location,
  model,
  experience,
  status,
  date,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    heading: heading || "Heading",
    label: label || "Label",
    location: location || "City, State, Country",
    model: model || "Work Model",
    experience: experience || "Experience",
    status: status || "default",
    date: date || "Posted last month",
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
          <div className={`heading-text ${state.status}`}>{heading}</div>
        </div>
        <div className="card-label ">
          <div className="label-text">{label}</div>
        </div>
        <div className="card-info">
          <div className="card-row">
            <div className="info-text">{location}</div>
          </div>
          <div className="card-row">
            <div className="info-text">{model}</div>
            <div className="info-text">{experience}</div>
          </div>
        </div>
      </div>
      <div className="card-image-ctn">
        <div className="thumbnail-ctn"></div>
        <div className="thumbnail-txt">{calculateInterval(date)}</div>
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

CardPost.propTypes = {
  date: PropTypes.string,
  heading: PropTypes.string,
  label: PropTypes.string,
  location: PropTypes.string,
  model: PropTypes.string,
  experience: PropTypes.string,
  status: PropTypes.string,
};
