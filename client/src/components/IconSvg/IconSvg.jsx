import { useReducer } from "react";
import "./style.css";

// Importing the SVGs
const AddIcon = "./src/assets/icons/add.svg";
const JobsIcon = "./src/assets/icons/jobs.svg";
const ReportIcon = "./src/assets/icons/report.svg";

// The reducer function to manage state
const reducer = (state, action) => {
  switch (action.type) {
    case "setType":
      return { ...state, type: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

// Component to load SVGs based on state.type
const IconLoader = () => {
  // Initial state is set to "add"
  const [state, dispatch] = useReducer(reducer, { type: "add" });

  // Function to render the appropriate SVG based on state.type
  const renderIcon = () => {
    switch (state.type) {
      case "add":
        return <img src={AddIcon} alt="Add Icon" />;
      case "jobs":
        return <img src={JobsIcon} alt="Jobs Icon" />;
      case "reports":
        return <img src={ReportIcon} alt="Report Icon" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>SVG Loader</h1>
      <div>{renderIcon()}</div>

      <button onClick={() => dispatch({ type: "setType", payload: "add" })}>
        Load Add Icon
      </button>
      <button onClick={() => dispatch({ type: "setType", payload: "jobs" })}>
        Load Jobs Icon
      </button>
      <button onClick={() => dispatch({ type: "setType", payload: "reports" })}>
        Load Report Icon
      </button>
    </div>
  );
};

export default IconLoader;
