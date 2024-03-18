import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/irc-logo-rb.png";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate(); // useNavigate hook
  const [errorServer, seterrorServer] = useState(false);
  const [Nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost/irc/signup.php",
        {
          Nom: Nom,
          telephone: telephone,
          password: password,
          email: email,
          prenom: prenom,
        }
      );
      console.log(response.data);
      if (response.data.error) {
        if (
          response.data.error_msg.includes(
            "Sorry, this email is already in use. Please try again."
          )
        ) {
          setEmailExists(true);
        }
      } else {
        navigate("/login"); // Redirect using useNavigate
        alert("User créé avec succès");
      }
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
      seterrorServer(true);
    }
  };

  return (
    <div className="signup-page">
      <div className="auth__form-container">
        <div className="auth__form-container_fields">
          <div className="auth__form-container_image">
            <img src={logo} alt="" />
          </div>
          <div className="auth__form-container_fields-content">
            <form onSubmit={handleSubmit}>
              <p className="auth__form-container_title">INSCRIPTION</p>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="nom">Nom</label>
                <input
                  name="nom"
                  type="text"
                  placeholder="Nom"
                  value={Nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="prenom">Prenom</label>
                <input
                  name="prenom"
                  type="text"
                  placeholder="Prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="email">E-mail</label>
                <input
                  name="email"
                  type="text"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailExists && (
                  <p style={{ color: "red" }}>This email is already in use.</p>
                )}
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="telephone">Telephone</label>
                <input
                  name="telephone"
                  type="tel"
                  placeholder="Telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="password">Mot de passe</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordMismatch && (
                  <p style={{ color: "red" }}>
                    Les mots de passe ne correspondent pas.
                  </p>
                )}
              </div>
              <div className="auth__form-container_fields-content_button">
                <button type="submit">S'inscrire</button>
              </div>
            </form>
          </div>
          <div className="account-link">
            <p>
              Vous avez déjà un compte ?
              <a href="/">
                <span>Se connecter</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
