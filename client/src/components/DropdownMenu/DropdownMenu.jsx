import { useState } from "react";
import { Option } from "../Option";
import { Button } from "../Button";
import "./style.css";

export const DropdownMenu = () => {
  const myList = [
    "option 1",
    "option 2",
    "option 3",
    "option 4",
    "option 5",
    "option 6",
  ]; // Array of items
  const [isOpen, setIsOpen] = useState(false); // State to control the dropdown visibility
  const [selectedOptions, setSelectedOptions] = useState([]); // State to track selected checkboxes
  const [tempSelectedOptions, setTempSelectedOptions] = useState([]); // Temporary state to track changes

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setTempSelectedOptions(selectedOptions); // Save the current state to temporary state
    setIsOpen(!isOpen);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (tempSelectedOptions.includes(value)) {
      setTempSelectedOptions(
        tempSelectedOptions.filter((option) => option !== value)
      );
    } else {
      setTempSelectedOptions([...tempSelectedOptions, value]);
    }
  };

  // Apply changes and close the dropdown
  const applyChanges = () => {
    setSelectedOptions(tempSelectedOptions); // Save the temporary state to the main state
    setIsOpen(false);
  };

  // Cancel changes and close the dropdown
  const cancelChanges = () => {
    setTempSelectedOptions(selectedOptions); // Revert temporary state to the main state
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={toggleDropdown}>
        <Option>Select Options</Option>
      </div>
      {isOpen && (
        <div className="dropdown-menu-ctn">
          <div className="search-ctn">
            <div className="search-bar">
              <input
                type="search"
                className="search-text"
                placeholder="By Filter name"
              />
            </div>
            <label className="option-item">
              <input
                type="checkbox"
                className="input-check"
                value="select all"
              />
              <span className="input-txt">{"Select All"}</span>
            </label>
          </div>
          <div className="option-menu-ctn">
            <div className="option-menu">
              {myList.map((item) => (
                <div key={item}>
                  <label className="option-item">
                    <input
                      type="checkbox"
                      className="input-check"
                      value={item}
                      checked={tempSelectedOptions.includes(item)}
                      onChange={handleCheckboxChange}
                    />
                    <span className="input-txt">
                      {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
                      {/* Capitalizes the first letter */}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Separator */}
          <hr className="separator" />
          {/* Cancel and Apply Buttons */}
          <div className="button-container">
            <div onClick={cancelChanges}>
              <Button label="Cancel" type="secondary" />
            </div>
            <div onClick={applyChanges}>
              <Button label="Apply" type="primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
