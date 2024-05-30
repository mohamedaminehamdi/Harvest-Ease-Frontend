import React, { useState } from 'react';
import '../components/SettingsPage.css';  // Make sure the CSS with the button styles is imported

function SettingsPage() {
    const [email, setEmail] = useState('user1234@gmail.com');
    const [profilePic, setProfilePic] = useState('https://free4kwallpapers.com/uploads/originals/2015/09/15/cute-sleeping-cat-hd-widescreen-desktop-wallpaper.jpg'); // Update with actual path
    const [color, setColor] = useState('#4CAF50');
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPicModal, setShowPicModal] = useState(false);
    const [showColorModal, setShowColorModal] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(newEmail);
        setShowEmailModal(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleColorChange = (e) => {
        setColor(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
          alert("New passwords do not match!");
          return;
      }
      // Call to API to change password here
      alert('Password successfully updated!');
  };

    return (
      <div className="settings">
      <h1>Settings</h1>
      <div className="setting">
          <label>Email Address</label>
          <div className="flex-space-between">
              <span>{email}</span> 
              <button className="button button-change" onClick={() => setShowEmailModal(true)}>Change</button>
          </div>
      </div>
      <div className="setting">
                <label>Password Change</label>
                <form onSubmit={handlePasswordChange}>
                    <input type="password" placeholder="Current Password" value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)} required />
                    <input type="password" placeholder="New Password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm New Password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit" className="button button-change">Change Password</button>
                </form>
            </div>
      <div className="setting center-content">
    <label>Profile Picture</label>
    <img src={profilePic} alt="Profile" />
    <div>
        <button className="button button-change" onClick={() => setShowPicModal(true)}>Change Picture</button>
        <button className="button button-delete" onClick={() => setProfilePic(null)}>Delete Picture</button>
    </div>
</div>

      <div className="setting">
          <label>Profile Palette</label>
          <div className="flex-space-between">
              <div style={{ backgroundColor: color, width: '30px', height: '30px', borderRadius: '50%' }}></div>
              <button className="button button-change" onClick={() => setShowColorModal(true)}>Change</button>
          </div>
      </div>
  </div>
);
    
}

export default SettingsPage;
