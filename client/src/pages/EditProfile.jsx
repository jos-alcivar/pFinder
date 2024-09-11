import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
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

  // Default values for each field
  const defaultValues = {
    country: "Country",
    state: "State/Province",
    city: "City",
    postalCode: "Postal Code",
    phoneNumber: "Phone Number",
  };

  // States for input fields, edit modes, and icon state
  const [isEditing, setIsEditing] = useState({
    country: false,
    state: false,
    city: false,
    postalCode: false,
    phoneNumber: false,
  });

  const [values, setValues] = useState({
    country: "",
    state: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [iconLabels, setIconLabels] = useState({
    country: "add",
    state: "add",
    city: "add",
    postalCode: "add",
    phoneNumber: "add",
  });

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
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

  // Handle the edit click for each field
  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  // Handle input change
  const handleInputChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  // Handle save click, update the icon, and stop event propagation
  const handleSaveClick = (field, e) => {
    e.stopPropagation(); // Prevent triggering the div's click event

    if (values[field].length === 0) {
      setIconLabels({ ...iconLabels, [field]: "add" }); // Reset icon to "add" if input is empty
    } else {
      setIconLabels({ ...iconLabels, [field]: "edit" }); // Change icon to "edit" if input is valid
    }
    setIsEditing({ ...isEditing, [field]: false });
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
                {loading ? "Uploading..." : "Upload photo"}
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
              {["country", "state", "city", "postalCode", "phoneNumber"].map(
                (field) => (
                  <div
                    key={field}
                    className="label-text-main"
                    onClick={() => handleEditClick(field)} // Trigger edit mode on div click
                  >
                    <CustomIconLoader label={iconLabels[field]} size="20px" />

                    {!isEditing[field] ? (
                      <>
                        <span className="user-label">
                          {defaultValues[`${field}`]}:
                        </span>
                        {/* Display the user input if it's not empty */}
                        {values[field] && (
                          <span className="user-text">{values[field]}</span>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="input-text"
                          name={field}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                          value={values[field]}
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
                )
              )}
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
