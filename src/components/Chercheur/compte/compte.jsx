import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./compte.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/irc-logo-rb.png";
import formation from "./formation.json";
import medical from "./medical.json";
import autre from "./autre.json";
import soin from "./soin.json";

const Compte = () => {
  const [userInformation, setUserInformation] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");
  const [otherValueStatus, setOtherValueStatus] = useState("");
  const [showDropdownStatus, setShowDropdownStatus] = useState(false);
  const [selectedOptionOrganisme, setSelectedOptionOrganisme] = useState("");
  const [otherValueOrganisme, setOtherValueOrganisme] = useState("");
  const [showDropdownOrganisme, setShowDropdownOrganisme] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Médicale");
  const [selectedInterests, setSelectedInterests] = useState({
    Epidemiologie: false,
    EssaisCliniques: false,
    RechercheClinique: false,
    SciencesHumaines: false,
    Biopathologie: false,
    NouvellesTechnologies: false,
  });
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedOptionMiatrise, setSelectedOptionMiatrise] = useState("");

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

      const handleSaveUserInfo = async () => {
        try {
          const response = await axios.post(
            "http://localhost/irc/saveUserInfo.php",
            {
              selectedSpecialty,
              selectedItem,
              selectedOptionStatus,
              selectedOptionOrganisme,
              selectedInterests,
            }
          );
          console.log(response.data);
          // Handle response if needed
        } catch (error) {
          console.error("Error saving user information:", error);
        }
      };

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

  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setSelectedInterests((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleOptionChangeStatus = (e) => {
    const value = e.target.value;
    setSelectedOptionStatus(value);
    if (value !== "Autre") {
      setOtherValueStatus("");
    }
    if (value === "Autre") {
      setShowDropdownStatus(true);
    } else {
      setShowDropdownStatus(false);
    }
  };

  const handleOptionChangeOrganisme = (e) => {
    const value = e.target.value;
    setSelectedOptionOrganisme(value);
    if (value !== "Autre") {
      setOtherValueOrganisme("");
    }
    if (value === "Autre") {
      setShowDropdownOrganisme(true);
    } else {
      setShowDropdownOrganisme(false);
    }
  };

  const handleCompleterProfileClick = () => {
    setShowProfileCompletion(true);
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
  };
  const handleDropdownChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <>
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
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="title">Mon Compte</h2>
          {userInformation ? (
            <div>
              <p className="item">
                <strong>Nom: </strong> {userInformation.nom}
              </p>
              <p className="item">
                <strong>Prenom: </strong> {userInformation.prenom}
              </p>
              <p className="item">
                <strong>Telephone: </strong> {userInformation.telephone}
              </p>
              <p className="item">
                <strong>Email: </strong> {userInformation.email}
              </p>
              {!showPasswordForm && ( // Hide button if password form is shown
                <button
                  className="buttoon"
                  onClick={() => setShowPasswordForm(true)}
                >
                  Changer le mot de passe
                </button>
              )}
              {showPasswordForm && (
                <form onSubmit={handlePasswordChange}>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Mot de passe actuel"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button className="buttoon" type="submit">
                    Modifier le mot de passe
                  </button>
                  {errorMessage && <p>{errorMessage}</p>}
                </form>
              )}
              {showProfileCompletion ? (
                <div>
                  <p className="item">
                    <strong>La spécialité de formation*</strong>
                  </p>
                  <label className="radio-btn">
                    <input
                      type="radio"
                      value="Médicale"
                      checked={selectedSpecialty === "Médicale"}
                      onChange={handleSpecialtyChange}
                    />
                    Médicale
                  </label>
                  <label className="radio-btn">
                    <input
                      type="radio"
                      value="Autre"
                      checked={selectedSpecialty === "Autre"}
                      onChange={handleSpecialtyChange}
                    />
                    Autre
                  </label>
                  {selectedSpecialty === "Médicale" && (
                    <div>
                      <p className="item">
                        <strong>specialite</strong>
                      </p>
                      <select
                        value={selectedItem}
                        className="input-field"
                        onChange={handleDropdownChange}
                      >
                        <option value="">choisir votre specialite</option>
                        {medical.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedSpecialty === "Autre" && (
                    <div>
                      <p className="item">
                        <strong>specialite</strong>
                      </p>
                      <select
                        value={selectedItem}
                        className="input-field"
                        onChange={handleDropdownChange}
                      >
                        <option value="">choisir votre specialite</option>
                        {autre.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <p className="item">
                    <strong>Statut*</strong>
                  </p>
                  <select
                    value={selectedOptionStatus}
                    className="input-field"
                    onChange={handleOptionChangeStatus}
                  >
                    <option value="">Selectionnez votre status</option>
                    <option value="Professeur agrégé">Professeur agrégé</option>
                    <option value="Professeur d’habilité">
                      Professeur d’habilité
                    </option>
                    <option value="Professeur assistant">
                      Professeur assistant
                    </option>
                    <option value="Maitre-assistant">Maitre-assistant</option>
                    <option value="Doctorant">Doctorant</option>
                    <option value="Post doctorant">Post doctorant</option>
                    <option value="Docteur (PHD)">Docteur (PHD)</option>
                    <option value="Médecin résident">Médecin résident</option>
                    <option value="Médecin">Médecin</option>
                    <option value="Médecin spécialiste">
                      Médecin spécialiste
                    </option>
                    <option value="Médecin dentaire">Médecin dentaire</option>
                    <option value="Pharmacien">Pharmacien</option>
                    <option value="Ingénieur">Ingénieur</option>
                    <option value="Autre">Autre</option>
                  </select>
                  {selectedOptionStatus === "Autre" && (
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Votre status"
                      value={otherValueStatus}
                      onChange={(e) => setOtherValueStatus(e.target.value)}
                    />
                  )}

                  {/* Second dropdown */}
                  <p className="item">
                    <strong>
                      Type de l'organisme d'affiliation principale*
                    </strong>
                  </p>
                  <select
                    value={selectedOptionOrganisme}
                    className="input-field"
                    onChange={handleOptionChangeOrganisme}
                  >
                    <option value="">
                      Selectionnez votre organisme d'affiliation principale
                    </option>
                    <option value="Formation et Recherche">
                      Formation et Recherche
                    </option>
                    <option value="Soins, Formation et Recherche">
                      Soins, Formation et Recherche
                    </option>
                    <option value="Autre">Autre</option>
                  </select>
                  {selectedOptionOrganisme === "Autre" && (
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Votre organisme"
                      value={otherValueOrganisme}
                      onChange={(e) => setOtherValueOrganisme(e.target.value)}
                    />
                  )}
                  {selectedOptionOrganisme === "Formation et Recherche" && (
                    <div>
                      <p className="item">
                        <strong>
                          L'organisme de Formation et Recherche auquel vous êtes
                          affiliés *
                        </strong>
                      </p>
                      <select
                        value={selectedItem}
                        className="input-field"
                        onChange={handleDropdownChange}
                      >
                        <option value="">
                          choisir L'organisme de Formation et Recherche auquel
                          vous êtes affiliés *
                        </option>
                        {/* Render options for the second dropdown */}
                        {formation.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedOptionOrganisme ===
                    "Soins, Formation et Recherche" && (
                    <div>
                      <p className="item">
                        <strong>
                          L'organisme de Soins, Formation et Recherche auquel
                          vous êtes affiliés *
                        </strong>
                      </p>
                      <select
                        value={selectedItem}
                        className="input-field"
                        onChange={handleDropdownChange}
                      >
                        <option value="">
                          choisir L'organisme de Soins, Formation et Recherche
                          auquel vous êtes affiliés *
                        </option>
                        {/* Render options for the second dropdown */}
                        {soin.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <p className="item">
                    <strong>Votre Domaine de maîtrise *</strong>
                  </p>
                  <select
                    value={selectedOptionMiatrise}
                    className="input-field"
                  >
                    <option value="">Selectionnez Votre Domaine de maîtrise</option>
                    <option value="Épidémiologie et Santé Publique">
                      Épidémiologie et Santé Publique
                    </option>
                    <option value="Essais Cliniques">Essais Cliniques</option>
                    <option value="Recherche Clinique">
                      Recherche Clinique
                    </option>
                    <option value="Sciences Humaines, Sociales, Juridiques et Economiques">
                      Sciences Humaines, Sociales, Juridiques et Economiques
                    </option>
                    <option value="Biopathologie et Recherche Biomédicale**">
                      Biopathologie et Recherche Biomédicale**
                    </option>
                    <option value="Nouvelles Technologies, Ingénierie, Systèmes d’Information et IA">
                      Nouvelles Technologies, Ingénierie, Systèmes d’Information
                      et IA
                    </option>
                  </select>
                  <div>
                    <p className="item">
                      <strong>
                        Domaine d'intérêt pour la recherche scientifique sur le
                        cancer *
                      </strong>
                    </p>
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        name="Epidemiologie"
                        value="Épidémiologie et Santé Publique"
                        onChange={handleInterestChange}
                      />
                      Épidémiologie et Santé Publique
                    </label>
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        name="EssaisCliniques"
                        value="Essais Cliniques"
                        onChange={handleInterestChange}
                      />
                      Essais Cliniques
                    </label>
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        name="RechercheClinique"
                        value="Recherche Clinique"
                        onChange={handleInterestChange}
                      />
                      Recherche Clinique
                    </label>
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        name="SciencesHumaines"
                        value="Sciences Humaines, Sociales, Juridiques et Economiques"
                        onChange={handleInterestChange}
                      />
                      Sciences Humaines, Sociales, Juridiques et Economiques
                    </label>
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        name="Biopathologie"
                        value="Biopathologie et Recherche Biomédicale"
                        onChange={handleInterestChange}
                      />
                      Biopathologie et Recherche Biomédicale
                    </label>
                    <label className="checkbox-btn">
                      <input
                        type="checkbox"
                        name="NouvellesTechnologies"
                        value="Nouvelles Technologies, Ingénierie, Systèmes d’Information et IA"
                        onChange={handleInterestChange}
                      />
                      Nouvelles Technologies, Ingénierie, Systèmes d’Information
                      et IA
                    </label>
                    <br />
                    <label className="checkbox-btn">
                      <input type="checkbox" required />
                      J'accepte les Termes et les Conditions Générales
                      d'Utilisation Conformément à la loi 08-09, vous pouvez
                      exercer vos droits d'accès, de rectification et
                      d'opposition en vous adressons à l'unité SI & Bases de
                      données par mail à la boite:<strong> irc_associes@irc.ma{" "}</strong>
                      <span> NB * : champ obligatoire.</span>
                    </label>
                  </div>
                  <button
                    className="buttoon"
                    onClick={() => setShowProfileCompletion(false)}
                  >
                    Enregistrer
                  </button>
                </div>
              ) : (
                <button
                  className="buttoon"
                  onClick={handleCompleterProfileClick}
                >
                  Completer Mon Profile
                </button>
              )}
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Compte;
