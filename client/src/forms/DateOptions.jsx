/* eslint-disable react/prop-types */
import { OptionCircle } from "../components/OptionCircle";

export function DateRangeOptions({ dateRange, setDateRange }) {
  const handleTypeChange = (index) => {
    setDateRange((prevOptions) =>
      prevOptions.map((opt, idx) => ({
        ...opt,
        type: idx === index ? "selected" : "unselected", // Set the clicked option to "selected" and others to "unselected"
      }))
    );
  };

  return (
    <div className="dateRange-row">
      {dateRange.map((option, index) => (
        <OptionCircle
          key={index}
          label={option.label}
          status={option.status}
          type={option.type} // Pass down the current type of each option
          onTypeChange={() => handleTypeChange(index)}
        />
      ))}
    </div>
  );
}
