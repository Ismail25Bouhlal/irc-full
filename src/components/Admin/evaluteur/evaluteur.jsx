import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import "./Evaluteur.css"; // Import the CSS file

const Evaluteur = () => {
  const [users, setUsers] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    axios
      .get("http://localhost/irc/evaluteur.php")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="evaluteur-container">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="sidebar-item" onClick={() => handleItemClick(null)}>
            <FaHome className="sidebar-icon" />
            Home
          </div>
        </Link>
        <div
          className={`sidebar-item ${
            selectedItem === "competition" ? "active" : ""
          }`}
          onClick={() => handleItemClick("competition")}
        >
          <FaFolder className="sidebar-icon" />
          Competition
        </div>
        <Link to={"/Utilisateurs"} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <FiUsers className="sidebar-icon" />
            Utilisateurs
          </div>
        </Link>
        <Link to={"/Evaluateur"} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <FaUserPen className="sidebar-icon" />
            Evaluateur
          </div>
        </Link>
      </div>
      <div className="content">
        <h1>Evaluteur Users</h1>
        <div className="table-responsive">
          <table className="evaluteur-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Telephone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.nom}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evaluteur;
