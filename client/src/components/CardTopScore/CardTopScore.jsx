import PropTypes from "prop-types";
import { useReducer } from "react";
import "./style.css";

export const CardTopScore = ({ label, filter, data, status }) => {
  const [state, dispatch] = useReducer(reducer, {
    label: label || "Heading",
    filter: filter || "Filter",
    status: status || "default",
  });

  return (
    <div
      className="cardTopScore-ctn"
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className="card-heading">
        <div className={`heading-text`}>{label}</div>
      </div>
      <div className="card-label ">
        <div className="filter-text">{filter}</div>
        <div className="result-text">{"Results"}</div>
      </div>
      <div className="card-list">
        {data.map((entry, index) => (
          <div key={index} className="card-row">
            <div className="item-text">{entry.item}</div>
            <div className="value-text">{entry.value}</div>
          </div>
        ))}
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

CardTopScore.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  filter: PropTypes.string,
  item: PropTypes.array,
  value: PropTypes.array,
  status: PropTypes.string,
};
