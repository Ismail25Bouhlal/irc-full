import React, { useState } from "react";
import axios from "axios";
import logo from "../../src/assets/irc-logo-rb.png";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from "js-cookie";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/irc/login.php", {
        email: email,
        password: password,
      });

      if (
        response.data.role === "evaluateur" ||
        response.data.role === "chercheur" ||
        response.data.role === "administrateur"
      ) {
        Cookies.set("email", email, { expires: 30 });

        if (response.data.idevaluteur) {
          Cookies.set("idevaluateur", response.data.idevaluteur, {
            expires: 30,
            path: "/",
          });
        }
        if (response.data.idchercheur) {
          Cookies.set("idchercheur", response.data.idchercheur, {
            expires: 30,
            path: "/",
          });
        }

        console.log("idchercheur","idevaluateur" , response.data.idchercheur , response.data.idevaluteur);

        console.log("Login successful", response.data);

        if (
          response.data.role === "chercheur" ||
          response.data.role === "evaluateur"
        ) {
          navigate("/select-profile");
        } else {
          navigate("/home");
          onLogin(response.data.role);
        }
      } else {
        setErrorMessage(response.data.message);
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="login-image">
        <img src={logo} alt="" />
      </div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-content">
            <form onSubmit={doLogin}>
              <p>Login</p>
              <div className="input-container">
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
              <div className="input-container">
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
              <div className="button-container">
                <button type="submit">S'identifier</button>
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
            </form>
          </div>
          <div className="account-link">
            <p>
              Vous n'avez pas de compte ?{" "}
              <a href="/signup">
                <span>S'inscrire</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
