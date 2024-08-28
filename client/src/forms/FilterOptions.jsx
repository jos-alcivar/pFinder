/* eslint-disable react/prop-types */
import { DropdownMenu } from "../components/DropdownMenu";

export function FilterOptions({ filterOptions, setFilterOptions }) {
  const handleTypeChange = (index) => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((opt, idx) => ({
        ...opt,
        type: idx === index ? "selected" : "unselected", // Set the clicked option to "selected" and others to "unselected"
      }))
    );
  };

  return (
    <div className="filter-bar">
      {filterOptions.map((option, index) => (
        <DropdownMenu
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
