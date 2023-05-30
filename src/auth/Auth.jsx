import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../auth/Auth.css";
import login from "../assets/header_logo-transformed-removebg-preview.png";

const cookies = new Cookies();

const Auth = () => {
  const [errorServer, seterrorServer] = useState(false);
  const [Nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [date_de_nainssance, setDate_de_nainssance] = useState("");
  const [adresse_line1, setAdresse_line1] = useState("");
  const [idAfilliation, setIdAfilliation] = useState("");
  const [adresse_line2, setAdresse_line2] = useState("");
  const [ville, setVille] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [telephone, setTelephone] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/ircapi/auth/signup.php",

        {
          Nom: Nom,
          telephone: telephone,
          password: password,
          adresse_line1: adresse_line1,
          email: email,
          password: password,
          ville: ville,
          adresse_line2: adresse_line2,
          idAfilliation: idAfilliation,
          date_de_nainssance: date_de_nainssance,
          prenom: prenom,
        }
      );
       console.log(response.data);
       setPassword("");
       setConfirm_password("");
    } catch (error) {
      console.error(error);
      seterrorServer(true);
    }
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_image ">
          <img src={login} alt="" />
        </div>
        <div className="auth__form-container_fields-content">
          <form onSubmit={handleSubmit}>
            <p>INSCRIPTION</p>
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
              <label htmlFor="Prenom">Prenom</label>
              <input
                name="Prenom"
                type="text"
                placeholder="prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="Date_de_naissance">Date de naissance</label>
              <input
                name="Date de naissance"
                type="date"
                placeholder="Date de naissance"
                value={date_de_nainssance}
                onChange={(e) => setDate_de_nainssance(e.target.value)}
                required
              />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="adresse_line1">Adresse Ligne 1</label>
              <input
                name="Adresse Ligne 1"
                type="Texte"
                placeholder="Adresse Ligne 1"
                value={adresse_line1}
                onChange={(e) => setAdresse_line1(e.target.value)}
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
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="">votre ville</label>

              <select className="select">
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Alger</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
              </select>
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="phoneNumber">Numéro de téléphone</label>
              <input
                name="phoneNumber"
                id="phone"
                type="tel"
                placeholder="Numéro de téléphone"
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
              <label htmlFor="confirm_password">
                Confirmer le mot de passe
              </label>
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirm_password}
                onChange={(e) => setConfirm_password(e.target.value)}
                required
              />
            </div>
            <div className="auth__form-container_fields-content_button">
              <button type="submit">S'inscrire</button>
            </div>
          </form>
        </div>
        <div className="auth__form-container_fields-account">
          <p>
            Vous avez deja compte ?
            <a href="/">
              <span>S'inscrire</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
