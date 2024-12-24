import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import "./projet.css";
import logo from "../../../assets/irc-logo-rb.png";

function Project() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("competition");

  const navigate = useNavigate();

  const handleEditClick = (competition) => {
    navigate("/ModifierComp", { state: { selectedCompetition: competition } });
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(
          "http://localhost/irc/getCompitition.php"
        );
        setCompetitions(response.data);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </div>
        </Link>
        <div
          className={`sidebar-item ${
            selectedItem === "competition" ? "active" : ""
          }`}
          // onClick={() => handleItemClick("competition")}
        >
          <FaFolder style={{ marginRight: "8px" }} />
          Competition
        </div>
        <Link to={"/Utilisateurs"}>
          <div className="sidebar-item">
            <FiUsers style={{ marginRight: "8px" }} />
            Utilisateurs
          </div>
        </Link>
        <Link to={"/Evaluateur"}>
          <div className="sidebar-item">
            <FaUserPen style={{ marginRight: "8px" }} />
            Evaluateur
          </div>
        </Link>
      </div>
      {selectedItem === "competition" && (
        <div className="table-container">
          <h1 className="table-title">COMPETITION</h1>
          <Link to={"/AjouteruneComp"}>
            <button className="add-btn">+ Ajouter une competition</button>
          </Link>
          <table className="competition-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Titre</th>
                <th>Libellé</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>En ligne</th>
                <th>Date de competition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {competitions.map((competition, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{competition.titre}</td>
                  <td>{competition.libelle}</td>
                  <td>{competition.date_debut}</td>
                  <td>{competition.date_fin}</td>
                  <td>{competition.enligne === "1" ? "Oui" : "Non"}</td>
                  <td>{competition.annee_competition}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(competition)}
                    >
                      <MdModeEditOutline />
                    </button>
                    <button className="delete-btn">
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Project;
