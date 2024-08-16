import PropTypes from "prop-types";
import { useReducer } from "react";
import NextIcon from "../../assets/icons/next.svg";
import "./style.css";

export const CardTopScore = ({ heading, filter, item, value, status }) => {
  const [state, dispatch] = useReducer(reducer, {
    heading: heading || "Heading",
    filter: filter || "Filter",
    item: item || ["Item 1", "Item 2", "Item 3"],
    value: value || ["100", "90", "80"],
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
        <div className={`heading-text ${state.status}`}>{state.heading}</div>
        <img src={NextIcon} alt="next arrow" />
      </div>
      <div className="card-label ">
        <div className="filter-text">{state.filter}</div>
        <div className="result-text">{"Results"}</div>
      </div>
      <div className="card-list">
        <div className="card-row">
          <div className="item-text">{state.item[0]}</div>
          <div className="value-text">{state.value[0]}</div>
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

CardTopScore.propTypes = {
  heading: PropTypes.string,
  filter: PropTypes.string,
  item: PropTypes.array,
  value: PropTypes.array,
  status: PropTypes.string,
};
