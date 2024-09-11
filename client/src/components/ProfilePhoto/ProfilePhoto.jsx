/* eslint-disable react/prop-types */
// src/components/ProfilePhoto.jsx
import { useRef } from "react";
import "./style.css"; // Add styles for ProfilePhoto if needed

export const ProfilePhoto = ({
  profilePhoto,
  onPhotoChange,
  loading,
  error,
}) => {
  const fileInputRef = useRef(null);

  const handleClickUploader = () => {
    fileInputRef.current.click();
  };

  return (
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
          onChange={onPhotoChange}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
