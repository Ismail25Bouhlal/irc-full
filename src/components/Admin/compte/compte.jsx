import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../../../assets/irc-logo-rb.png";
import data from "./formatted_data.json"

const Compte = () => {
  const [userInformation, setUserInformation] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const email = Cookies.get("email");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost/irc/Mon-compte.php",
          { email: email }
        );
        setUserInformation(response.data.userInformation);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (email) {
      fetchUserInfo();
    }
  }, [email]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/irc/changeMotDePasse.php",
        {
          email: email,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }
      );

      if (!response.data.error) {
        // Password updated successfully, you can update UI accordingly
        setErrorMessage("");
        setShowPasswordForm(false);
      } else {
        setErrorMessage(response.data.error_msg);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="auth__form-container_image">
        <img src={logo} alt="" />
        <ul className="nav-links">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/login">
            <li>Se deconnecter</li>
          </Link>
        </ul>
      </div>
      <h2>User Information</h2>
      {userInformation ? (
        <div>
          <p>
            <strong>Nom:</strong> {userInformation.nom}
          </p>
          <p>
            <strong>Prenom:</strong> {userInformation.prenom}
          </p>
          <p>
            <strong>Telephone:</strong> {userInformation.telephone}
          </p>
          {/* <p>
            <strong>Role:</strong> {userInformation.role}
          </p> */}
          <p>
            <strong>Email:</strong> {userInformation.email}
          </p>
          {showPasswordForm ? (
            <form onSubmit={handlePasswordChange}>
              <div>
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Change Password</button>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
          ) : (
            <button onClick={() => setShowPasswordForm(true)}>
              Modifier le mot de passe
            </button>
          )}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Compte;
