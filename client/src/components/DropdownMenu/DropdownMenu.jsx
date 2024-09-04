/* eslint-disable react/prop-types */
import { useReducer, useEffect, useState } from "react";
import { FilterOption } from "../FilterOption";
import { Button } from "../Button";
import "./style.css";

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
  onApplyChanges,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");

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

  const applyChanges = () => {
    dispatch({
      type: "APPLY_CHANGES",
      payload: { totalOptions: optionList.length },
    });
    onToggle();
    onTypeChange(
      state.tempSelectedOptions.length > 0 ? "selected" : "unselected"
    );

    if (onApplyChanges) {
      onApplyChanges({
        label,
        selectedOptions: state.tempSelectedOptions,
      });
    }
  };

  const cancelChanges = () => {
    dispatch({
      type: "CANCEL_CHANGES",
      payload: { totalOptions: optionList.length },
    });
    onToggle();
    onTypeChange("unselected");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = optionList.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div onClick={onToggle}>
        <FilterOption
          label={label}
          type={type}
          onTypeChange={onTypeChange}
          isEmpty={state.tempSelectedOptions.length === 0}
        />
      </div>
      {isOpen && (
        <div className="dropdown-menu-ctn">
          <div className="search-ctn">
            <div className="search-bar">
              <input
                type="search"
                className="search-text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
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
              <span className="input-txt">
                {state.isSelectAllChecked ? "Deselect All" : "Select All"}
              </span>
            </label>
          </div>
          <div className="option-menu-ctn">
            <div className="option-menu">
              {filteredOptions.map((item) => (
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
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr className="separator" />
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
