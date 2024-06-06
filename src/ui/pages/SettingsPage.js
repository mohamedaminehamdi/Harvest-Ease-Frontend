import React, { useState } from "react";
import axios from "axios";
import "../components/SettingsPage.css"; // Ensure CSS is imported
import { useSelector } from "react-redux";

function SettingsPage() {
  const {
    _id: userId,
    name,
    picturePath,
    email,
  } = useSelector((state) => state.auth.user);
  const [profilePic, setProfilePic] = useState(
    "https://free4kwallpapers.com/uploads/originals/2015/09/15/cute-sleeping-cat-hd-widescreen-desktop-wallpaper.jpg"
  );
  const [buttonColor, setButtonColor] = useState("#4CAF50");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPicModal, setShowPicModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleEmailChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/settings/users/${userId}/email`,
        {
          newEmail,
        }
      );

      if (response.status === 200) {
        alert("Email successfully updated!");
        setShowEmailModal(false);
      }
    } catch (error) {
      alert("Error updating email: " + error.response.data.error);
    }
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        {
          newPassword,
        }
      );

      if (response.status === 200) {
        alert("Password successfully updated!");
        setShowPasswordChange(false);
      }
    } catch (error) {
      alert("Error updating password: " + error.response.data.error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
    setShowPicModal(false);
  };

  const handleColorSelection = (e) => {
    setButtonColor(e.target.value); // Update button color
  };

  const confirmColorChange = () => {
    setShowColorModal(false); // Close modal after confirming color change
  };

  return (
    <div className="settings">
      <div
        className={
          showEmailModal || showPicModal || showColorModal
            ? "settings-content blur"
            : "settings-content"
        }
      >
        <h1>Settings</h1>
        <div className="setting">
          <label>Email Address</label>
          <div>
            <span>{email}</span>
            <button
              style={{ backgroundColor: buttonColor }}
              className="button"
              onClick={() => setShowEmailModal(true)}
            >
              Change
            </button>
          </div>
        </div>
        <div className="setting">
          <button
            style={{ backgroundColor: buttonColor }}
            className="button"
            onClick={() => setShowPasswordChange(!showPasswordChange)}
          >
            Change Password
          </button>
          {showPasswordChange && (
            <form onSubmit={handlePasswordChange}>
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                style={{ backgroundColor: buttonColor }}
                type="submit"
                className="button"
              >
                Submit Change
              </button>
            </form>
          )}
        </div>
        <div className="setting center-content">
          <label>Profile Picture</label>
          <img
            src={`http://localhost:3000/assets/${picturePath}`}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <div>
            <button
              style={{ backgroundColor: buttonColor }}
              className="button"
              onClick={() => setShowPicModal(true)}
            >
              Change Picture
            </button>
          </div>
        </div>
        <div className="setting">
          <label>Profile Palette</label>
          <div className="flex-space-between">
            <div
              style={{
                backgroundColor: buttonColor,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
            ></div>
            <button
              style={{ backgroundColor: buttonColor }}
              className="button"
              onClick={() => setShowColorModal(true)}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      {showEmailModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEmailModal(false)}>
              &times;
            </span>
            <form onSubmit={handleEmailChange}>
              <input
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                style={{ backgroundColor: buttonColor }}
                type="submit"
                className="button"
              >
                Update Email
              </button>
            </form>
          </div>
        </div>
      )}
      {showPicModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowPicModal(false)}>
              &times;
            </span>
            <form>
              <input type="file" onChange={handleProfilePicChange} required />
              <button
                style={{ backgroundColor: buttonColor }}
                type="submit"
                className="button"
              >
                Upload Picture
              </button>
            </form>
          </div>
        </div>
      )}
      {showColorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowColorModal(false)}>
              &times;
            </span>
            <h2>Choose Color</h2>
            <input
              type="color"
              value={buttonColor}
              onChange={handleColorSelection}
            />
            <button
              style={{ backgroundColor: buttonColor }}
              className="button"
              onClick={confirmColorChange}
            >
              Update Color
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
