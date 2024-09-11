import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { editUserInfo, getUserInfo } from "../utils/profile.helpers";
import Header from "../layout/Header";
import TapBar from "../layout/TapBar";
import CustomIconLoader from "../components/CustomIconLoader/CustomIconLoader";

import "./EditProfile.css";

function EditProfile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profilePhoto, setProfilePhoto] = useState(
    `http://localhost:3000/user/${user.user_uuid}/photo`
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Array of fields with default values
  const fieldKeys = [
    "first_name",
    "last_name",
    "gender",
    "pronouns",
    "jobtitle_name",
    "website",
    "birth_date",
  ];

  // Consolidated state for form fields
  const [fields, setFields] = useState(
    fieldKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          value: "",
          isEditing: false,
          iconLabel: "add",
          defaultValue: key
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
            .replace(/^Jobtitle Name$/, "Job Title"), // Specific replacement for "Job Title Name"
        },
      }),
      {}
    )
  );

  // Fetch user data when the component mounts
  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await getUserInfo(user.user_uuid);

        if (userData) {
          setFields((prevFields) => {
            const updatedFields = { ...prevFields };
            fieldKeys.forEach((key) => {
              if (userData[key]) {
                updatedFields[key] = {
                  ...updatedFields[key],
                  value: userData[key], // Update value from fetched data
                  iconLabel:
                    userData[key].length > 0
                      ? "edit"
                      : updatedFields[key].iconLabel, // Set iconLabel to "edit" if value is not empty
                };
              }
            });
            return updatedFields;
          });
        } else {
          console.error("No user data received.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    // Ensure user.user_uuid is available before fetching
    if (user.user_uuid) {
      fetchUserData();
    } else {
      console.error("user.user_uuid is not defined.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user_uuid]); // Dependency on `user.user_uuid` only

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Invalid file type");
        return;
      }

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("user_id", user.user_id);

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/user/upload-profile-photo",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setProfilePhoto(imageUrl);
        alert("Photo uploaded successfully");
      } catch (error) {
        console.error("Failed to upload photo:", error);
        setError("Failed to upload photo. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClickUploader = () => {
    fileInputRef.current.click();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleEditClick = (field) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], isEditing: true },
    }));
  };

  const handleInputChange = (name, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [name]: { ...prevFields[name], value },
    }));
  };

  const handleSaveClick = (field, e) => {
    e.stopPropagation();

    setFields((prevFields) => ({
      ...prevFields,
      [field]: {
        ...prevFields[field],
        isEditing: false,
        iconLabel: prevFields[field].value.length === 0 ? "add" : "edit",
      },
    }));
    editUserInfo(user.user_uuid, fields, setFields);
  };

  return (
    <div className="app-ctn">
      <Header title={"pFinder"} />
      <div className="body-ctn">
        <div className="content-ctn">
          <div className="account-ctn">
            <div className="profile-ctn">
              <div className="image-ctn">
                <img
                  className="photo-profile"
                  src={profilePhoto}
                  alt="Profile"
                  width={"96px"}
                  height={"96px"}
                />
              </div>
              <div className="text-upload" onClick={handleClickUploader}>
                {loading ? "Uploading..." : "Update photo"}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="profile-menu-ctn">
              {fieldKeys.map((field, index) => (
                <>
                  <div
                    key={field}
                    className="label-text-main"
                    onClick={() => handleEditClick(field)}
                  >
                    <CustomIconLoader
                      label={fields[field].iconLabel}
                      size="20px"
                    />
                    {!fields[field].isEditing ? (
                      <>
                        <span className="user-label">
                          {fields[field].defaultValue}:
                        </span>
                        {fields[field].value && (
                          <span className="user-text">
                            {fields[field].value}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type={field == "birthDate" ? "date" : "text"}
                          className="input-text"
                          name={field}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          value={fields[field].value}
                        />
                        <div
                          className="save-btn"
                          onClick={(e) => handleSaveClick(field, e)}
                        >
                          Save
                        </div>
                      </>
                    )}
                  </div>
                  {index === 1 || index === 3 || index === 5 ? (
                    <hr className="separator"></hr>
                  ) : null}
                </>
              ))}
            </div>

            <div className="btn-row">
              <button onClick={handleBackClick} className="back-btn">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <TapBar account={"selected"} />
    </div>
  );
}

export default EditProfile;
