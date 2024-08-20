import { useReducer, useState } from "react";
import { Option } from "../components/Option";

const experience = ["jun", "mid", "sr"];

const Test = () => {
  const [options, setOptions] = useState(
    experience.map((exp) => ({
      label: exp,
      status: "default",
    }))
  );

  const handleClick = () => {
    // Log options with type "selected"
    const clickedOptions = options.filter(
      (option) => option.type === "selected"
    );
    console.log(clickedOptions);
  };

  return (
    <div className="app">
      {options.map((option, index) => (
        <Option
          key={index}
          label={option.label}
          status={option.status}
          onTypeChange={(newType) => {
            setOptions((prevOptions) =>
              prevOptions.map((opt, idx) =>
                idx === index ? { ...opt, type: newType } : opt
              )
            );
          }}
        />
      ))}
      <button onClick={handleClick}>Check</button>
    </div>
  );
};

export default Test;
