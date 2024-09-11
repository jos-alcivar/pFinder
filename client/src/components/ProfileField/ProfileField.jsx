/* eslint-disable react/prop-types */
// src/components/ProfileField.jsx
import CustomIconLoader from "../CustomIconLoader/CustomIconLoader";
import "./style.css"; // Add styles for ProfileField if needed

export const ProfileField = ({
  field,
  defaultValues,
  values,
  isEditing,
  iconLabels,
  onEditClick,
  onInputChange,
  onSaveClick,
}) => {
  return (
    <div
      key={field}
      className="label-text-main"
      onClick={() => onEditClick(field)}
    >
      <CustomIconLoader label={iconLabels[field]} size="20px" />

      {!isEditing[field] ? (
        <>
          <span className="user-label">{defaultValues[field]}:</span>
          {values[field] && <span className="user-text">{values[field]}</span>}
        </>
      ) : (
        <>
          <input
            type="text"
            className="input-text"
            name={field}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
            value={values[field]}
          />
          <div className="save-btn" onClick={(e) => onSaveClick(field, e)}>
            Save
          </div>
        </>
      )}
    </div>
  );
};
