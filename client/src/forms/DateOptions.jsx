/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { OptionCircle } from "../components/OptionCircle";

export function DateRangeOptions({ dateRange, setDateRange }) {
  // Set "ALL" as the default selected option when the component mounts
  useEffect(() => {
    setDateRange((prevOptions) =>
      prevOptions.map((opt) =>
        opt.label.toUpperCase() === "ALL"
          ? { ...opt, type: "selected" }
          : { ...opt, type: "unselected" }
      )
    );
  }, [setDateRange]);

  const handleTypeChange = (index) => {
    setDateRange((prevOptions) =>
      prevOptions.map((opt, idx) => ({
        ...opt,
        type: idx === index ? "selected" : "unselected",
      }))
    );
  };

  return (
    <div className="dateRange-row">
      {dateRange.map((option, index) => (
        <OptionCircle
          key={option.id || index} // Use a unique identifier if available
          label={option.label}
          status={option.status}
          type={option.type}
          onTypeChange={() => handleTypeChange(index)}
        />
      ))}
    </div>
  );
}

DateRangeOptions.propTypes = {
  dateRange: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      status: PropTypes.string,
      type: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  setDateRange: PropTypes.func.isRequired,
};
