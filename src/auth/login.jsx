import React, { useState } from "react";
import axios from "axios";
import "../auth/Auth.css";
import login from "../assets/header_logo-transformed-removebg-preview.png";

const Login = () => {
  const [errorServer, seterrorServer] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/ircapi/auth/login.php",
        {
          email: email,
          password: password,
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Access-Control-Allow-Origin": "http://localhost:3000",
        //     "Access-Control-Allow-Methods": "POST, OPTIONS",
        //     "Access-Control-Allow-Headers": "Content-Type",
        //   },
        // }
      );

      console.log(response.data);

      if (response.data.status) {
        window.location.href = "./home";
      } else {
        setErrorMessage(response.data.message);
      }

      setEmail("");
      setPassword("");
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
          <form onSubmit={doLogin}>
            <p>Login</p>
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
            <div className="auth__form-container_fields-content_button">
              <button type="submit">S'identifier</button>
            </div>
            {errorMessage && <div className="error-message">email or password is invalid</div>}
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