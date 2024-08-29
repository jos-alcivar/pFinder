/* eslint-disable react/prop-types */
import { useReducer, useEffect } from "react";
import { FilterOption } from "../FilterOption";
import { Button } from "../Button";
import "./style.css";

// Define the initial state and reducer function
const initialState = {
  selectedOptions: [],
  tempSelectedOptions: [],
  isSelectAllChecked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_DROPDOWN":
      return {
        ...state,
        tempSelectedOptions: action.payload.selectedOptions,
        isSelectAllChecked: action.payload.isSelectAllChecked,
      };
    case "CHECKBOX_CHANGE":
      return {
        ...state,
        tempSelectedOptions: action.payload.isChecked
          ? [...state.tempSelectedOptions, action.payload.value]
          : state.tempSelectedOptions.filter(
              (option) => option !== action.payload.value
            ),
        isSelectAllChecked:
          action.payload.isChecked &&
          state.tempSelectedOptions.length + 1 === action.payload.totalOptions,
      };
    case "SELECT_ALL":
      return {
        ...state,
        tempSelectedOptions: action.payload.isChecked
          ? action.payload.optionList
          : [],
        isSelectAllChecked: action.payload.isChecked,
      };
    case "APPLY_CHANGES":
      return {
        ...state,
        selectedOptions: state.tempSelectedOptions,
        isSelectAllChecked:
          state.tempSelectedOptions.length === action.payload.totalOptions,
      };
    case "CANCEL_CHANGES":
      return {
        ...state,
        tempSelectedOptions: state.selectedOptions,
        isSelectAllChecked:
          state.selectedOptions.length === action.payload.totalOptions,
      };
    default:
      return state;
  }
}

export const DropdownMenu = ({
  label,
  optionList,
  type,
  onTypeChange,
  isOpen,
  onToggle,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Effect to sync tempSelectedOptions with selectedOptions when dropdown opens
  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: "TOGGLE_DROPDOWN",
        payload: {
          selectedOptions: state.selectedOptions,
          isSelectAllChecked:
            state.selectedOptions.length === optionList.length,
        },
      });
    }
  }, [isOpen, state.selectedOptions, optionList.length]);

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    dispatch({
      type: "CHECKBOX_CHANGE",
      payload: {
        value,
        isChecked: checked,
        totalOptions: optionList.length,
      },
    });
  };

  // Handle "Select All" checkbox change
  const handleSelectAllChange = (event) => {
    const { checked } = event.target;
    dispatch({
      type: "SELECT_ALL",
      payload: {
        isChecked: checked,
        optionList: optionList,
      },
    });
  };

  // Apply changes and close the dropdown
  const applyChanges = () => {
    dispatch({
      type: "APPLY_CHANGES",
      payload: { totalOptions: optionList.length },
    });
    onToggle(); // Close the dropdown
    onTypeChange(
      state.tempSelectedOptions.length > 0 ? "selected" : "unselected"
    );
  };

  // Cancel changes and close the dropdown
  const cancelChanges = () => {
    dispatch({
      type: "CANCEL_CHANGES",
      payload: { totalOptions: optionList.length },
    });
    onToggle(); // Close the dropdown
    onTypeChange("unselected"); // Reset type to 'unselected'
  };

  return (
    <div>
      <div onClick={onToggle}>
        <FilterOption
          label={label}
          type={type}
          onTypeChange={onTypeChange}
          isEmpty={state.tempSelectedOptions.length === 0} // Set isEmpty based on optionList length
        />
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
                checked={state.isSelectAllChecked}
                onChange={handleSelectAllChange}
              />
              <span className="input-txt">{"Select All"}</span>
            </label>
          </div>
          <div className="option-menu-ctn">
            <div className="option-menu">
              {optionList.map((item) => (
                <div key={item}>
                  <label className="option-item">
                    <input
                      type="checkbox"
                      className="input-check"
                      value={item}
                      checked={state.tempSelectedOptions.includes(item)}
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
