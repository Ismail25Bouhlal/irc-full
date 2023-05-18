import React, { useState } from "react";
// import Cookies from "universal-cookie";
import axios from "axios";
import "../auth/Auth.css";
import login from "../assets/header_logo-transformed-removebg-preview.png";
// import { Await } from "react-router-dom";

const Login = () => {
  // const [form, setForm] = useState(inisialState);
  // const [isSigneup, setIsSigneup] = useState(true);

  const [errorServer, seterrorServer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async () => {
    try{
      const response = await axios.post("http://localhost/ircapi/auth/signup.php",{
        email: email,
        password: password,
      });
      console.log(response.data);
    }catch(error){
      console.error(error);
      seterrorServer(true);
    }
  };

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const { fullName, username, password, phoneNumber, avatarURL } = form;

  //   const URL = "";

  //   const {
  //     data: { token, userId, hashedPassword },
  //   } = await axios.post(`${URL}/${isSigneup ? "signup" : "login"}`, {
  //     username,
  //     phoneNumber,
  //     password,
  //     avatarURL,
  //     fullName,
  //   });

  //   cookies.set("token", token);
  //   cookies.set("username", username);
  //   cookies.set("fullName", fullName);
  //   cookies.set("userId", userId);

  //   if (isSigneup) {
  //     cookies.set("phoneNumber", phoneNumber);
  //     cookies.set("avatarURL", avatarURL);
  //     cookies.set("hashedPassword", hashedPassword);
  //   }

  //   window.location.reload();
  // };
  // const switchMode = () => {
  //   setIsSigneup((prevIsSignup) => !prevIsSignup);
  // };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_image ">
          <img src={login} alt="" />
        </div>
        <div className="auth__form-container_fields-content">
          {errorServer ? <p>errooooooor</p> : ""}

          <form>
            <p>Login</p>
            {/* {isSigneup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Nom et prénom</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Nom et prénom"
                  onChange={handleChange}
                  required
                />
              </div>
            )} */}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="fullName">E-mail</label>
              <input
                name="Email"
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* {isSigneup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Numéro de téléphone</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Numéro de téléphone"
                  onChange={handleChange}
                  required
                />
              </div>
            )} */}
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
            {/* {isSigneup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmpassword">
                  Confirmer le mot de passe
                </label>
                <input
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  onChange={handleChange}
                  required
                />
              </div>
            )} */}
            <div className="auth__form-container_fields-content_button">
              <button type="button" onClick={doLogin}>S'identifier</button>
            </div>
          </form>
        </div>
        <div className="auth__form-container_fields-account">
          <p>
            Vous n'avez pas de compte ?
            <a href="/signeup">
              <span>S'identifier</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
