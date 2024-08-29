/* eslint-disable react/prop-types */
import { DropdownMenu } from "../components/DropdownMenu";
import { useState } from "react";

export function FilterOptions({
  filterOptions,
  setFilterOptions,
  onDropdownDataChange,
}) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleTypeChange = (index, newType) => {
    setFilterOptions((prevOptions) =>
      prevOptions.map((opt, idx) =>
        idx === index ? { ...opt, type: newType } : opt
      )
    );
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className="filter-bar">
      {filterOptions.map((option, index) => (
        <DropdownMenu
          key={index}
          label={option.label}
          optionList={option.optionList}
          type={option.type}
          onTypeChange={(newType) => handleTypeChange(index, newType)}
          isOpen={openDropdownIndex === index}
          onToggle={() => handleDropdownToggle(index)}
          onApplyChanges={onDropdownDataChange} // Pass the callback
        />
      ))}
    </div>
  );
}
