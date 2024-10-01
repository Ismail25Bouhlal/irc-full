import React from "react";
import { useNavigate } from "react-router-dom";
import './ProfileSelection.css'

const ProfileSelection = ({ onProfileSelect }) => {
  const navigate = useNavigate();

  const handleProfileSelect = (role) => {
    onProfileSelect(role);
    navigate("/home");
  };

  return (
    <div className="profile-selection-container">
      <h2 className="profile-title">Select Your Profile</h2>
      <div className="profile-buttons">
        <button
          className="profile-button chercheur-button"
          onClick={() => handleProfileSelect("chercheur")}
        >
          Chercheur
        </button>
        <button
          className="profile-button evaluateur-button"
          onClick={() => handleProfileSelect("evaluateur")}
        >
          Évaluateur
        </button>
      </div>
    </div>
  );
};

export default ProfileSelection;
