import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import "../auth/Auth.css";
import login from "../assets/header_logo-transformed-removebg-preview.png";

const cookies = new Cookies();

const inisialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
  dataVille:[]
};

const Auth = () => {
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_image ">
          <img src={login} alt="" />
        </div>
        <div className="auth__form-container_fields-content">
          <form>
            <p>INSCRIPTION</p>
            {/* {isSigneup && ( */}
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Nom et prénom</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Nom et prénom"
                  // onChange={handleChange}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Date de naissance</label>
                <input
                  name="Date de naissance"
                  type="date"
                  placeholder="Date de naissance"
                  // onChange={handleChange}
                  required
                />
              </div>
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Adresse Ligne 1</label>
                <input
                  name="Adresse Ligne 1"
                  type="Texte"
                  placeholder="Adresse Ligne 1"
                  // onChange={handleChange}
                  required
                />
              </div>
            {/* )} */}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="fullName">E-mail</label>
              <input
                name="Email"
                type="text"
                placeholder="E-mail"
                // onChange={handleChange}
                required
              />
            </div>
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="">votre ville</label>

              <select name="" id="">
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
                <option value="Morroco">Morroco</option>
              </select>
              

            </div>
            {/* {isSigneup && ( */}
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Numéro de téléphone</label>
                <input
                  name="phoneNumber"
                  id="phone"
                  type="tel"
                  placeholder="Numéro de téléphone"
                  // onChange={handleChange}
                  required
                />
              </div>
            {/* )} */}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Mot de passe</label>
              <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                // onChange={handleChange}
                required
              />
            </div>
            {/* {isSigneup && ( */}
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmpassword">
                  Confirmer le mot de passe
                </label>
                <input
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  // onChange={handleChange}
                  required
                />
              </div>
            {/* )} */}
            <div className="auth__form-container_fields-content_button">
              <button>S'inscrire</button>
            </div>
          </form>
        </div>
        <div className="auth__form-container_fields-account">
          <p>
            {/* {isSigneup */}
            Vous n'avez pas de compte ?
            <a href="/"><span>
              S'identifier
            </span></a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
