/* eslint-disable react/prop-types */
import { DropdownMenu } from "../components/DropdownMenu";
import { useState } from "react";

export function FilterOptions({ filterOptions, setFilterOptions }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // State to track which dropdown is open

  const handleTypeChange = (index, newType) => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((opt, idx) =>
        idx === index ? { ...opt, type: newType } : opt
      )
    );
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index); // Toggle the dropdown
  };

  return (
    <div className="filter-bar">
      {filterOptions.map((option, index) => (
        <DropdownMenu
          key={index}
          label={option.label}
          status={option.status}
          optionList={option.optionList}
          type={option.type} // Pass down the current type of each option
          onTypeChange={(newType) => handleTypeChange(index, newType)} // Pass down the new type
          isOpen={openDropdownIndex === index} // Pass down the open state
          onToggle={() => handleDropdownToggle(index)} // Pass down the toggle function
        />
      ))}
    </div>
  );
}
