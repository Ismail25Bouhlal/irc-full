import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/irc-logo-rb.png";
import "./NavbarSec.css";

const CustomNavbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <img src={logo} alt="" />
        <ul className="nav-links">
          <Link to="/">
            <li>Mon Compte</li>
          </Link>
          <Link to="/login">
            <li>Se deconnecter</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
