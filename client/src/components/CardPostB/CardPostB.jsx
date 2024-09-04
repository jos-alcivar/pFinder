import PropTypes from "prop-types";
import { calculateInterval } from "../../utils/date.helpers";
import { useReducer } from "react";
import "./style.css";

export const CardPostB = ({
  heading,
  label,
  location,
  model,
  experience,
  status,
  date,
  contact,
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
      className="cardPostB-ctn"
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="card-ctn">
        <div className="card-heading">
          <div className={`heading-text ${state.status}`}>
            <a href={contact}>{heading}</a>
          </div>
        </div>
        <div className="card-content">
          <div className="card-text-ctn">
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
            <div className="thumbnail-ctn">
              <div className="image-placeholder"></div>
            </div>
            <div className="thumbnail-txt">{calculateInterval(date)}</div>
          </div>
        </div>
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

CardPostB.propTypes = {
  date: PropTypes.string,
  heading: PropTypes.string,
  label: PropTypes.string,
  contact: PropTypes.string,
  location: PropTypes.string,
  model: PropTypes.string,
  experience: PropTypes.string,
  status: PropTypes.string,
};
