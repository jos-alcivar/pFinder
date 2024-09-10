import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Header from "../layout/Header";
import TabBar from "../layout/TapBar";
import CustomIconLoader from "../components/CustomIconLoader/CustomIconLoader";

import "./EditProfile.css";

function EditProfile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref to the hidden file input
  const [profilePhoto, setProfilePhoto] = useState(
    `http://localhost:3000/user/${user.user_uuid}/photo`
  ); // Initialize with current photo URL

  // Handle file change event when a user selects a photo
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("user_id", user.user_id); // Include the user ID in the form data

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

        // Create an object URL for the binary data
        const imageUrl = URL.createObjectURL(blob);

        //console.log(result.photo);
        setProfilePhoto(imageUrl); // Update the profile photo URL
        alert("Photo uploaded successfully");
      } catch (error) {
        console.error("Failed to upload photo:", error);
        alert("Failed to upload photo. Please try again.");
      }
    }
  };

  // Handle click event to trigger hidden file input
  const handleClickUploader = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
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
                  src={profilePhoto} // Display the updated photo
                  alt="Profile"
                  width={"96px"}
                  height={"96px"}
                />
              </div>
              <div className="text-upload" onClick={handleClickUploader}>
                Upload photo
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
            <div className="profile-menu-ctn">
              <div className="label-text-main">
                <CustomIconLoader label={"add"} size="20px"></CustomIconLoader>
                <span>Country</span>
              </div>
              <div className="label-text-main">
                <CustomIconLoader label={"add"} size="20px"></CustomIconLoader>
                <span>State/Province</span>
              </div>
              <div className="label-text-main">
                <CustomIconLoader label={"add"} size="20px"></CustomIconLoader>
                <span>City</span>
              </div>
              <hr className="separator" />
              <div className="label-text-main">
                <CustomIconLoader label={"add"} size="20px"></CustomIconLoader>
                <span>Postal Code</span>
              </div>
              <hr className="separator" />
              <div className="label-text-main">
                <CustomIconLoader label={"add"} size="20px"></CustomIconLoader>
                <span>Phone Number</span>
              </div>
            </div>
            <div className="btn-row">
              <button onClick={handleBackClick} className="back-btn">
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <TabBar account={"selected"} />
    </div>
  );
}

export default EditProfile;
