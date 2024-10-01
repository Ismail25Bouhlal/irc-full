import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container } from "react-bootstrap";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import "./projet.css";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";

function Project() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState({
    titre: "Sample Title",
    liblle: "Sample Description",
  });
  const [selectedItem, setSelectedItem] = useState("competition");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    // Fetch competition data when component mounts
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
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  const handleCompetitionClick = (competition) => {
    setSelectedCompetition(JSON.stringify(competition));
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="sidebar-item" onClick={() => handleItemClick(null)}>
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </div>
        </Link>
        <div
          className={`sidebar-item ${
            selectedItem === "competition" ? "active" : ""
          }`}
          onClick={() => handleItemClick("competition")}
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
        <Container
          className="content"
          style={{ marginTop: "5rem", marginLeft: "30%" }} // Remove border radius
        >
          <div>
            <h1 style={{ marginRight: "-60%", color: "black" }}>
              COMPETITION
            </h1>
            {/* Add shadow to table */}
            <Link to={"/AjouteruneComp"}>
              <button
                className="btn btn-success mb-3"
                style={{ marginRight: "20px" }}
              >
                + Ajouter une competition
              </button>
            </Link>
            <table
              className="table table-bordered table-hover"
              style={{ width: "150%" }}
            >
              <thead className="">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Titre</th>
                  <th scope="col">Libellé</th>
                  <th scope="col">Date de début</th>
                  <th scope="col">Date de fin</th>
                  <th scope="col">enligne</th>
                  <th scope="col">Date de competition</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitions.map((competition, index) => (
                  <tr
                    key={index}
                    onClick={() => handleCompetitionClick(competition)}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{competition.titre}</td>
                    <td>{competition.libelle}</td>
                    <td>{competition.date_debut}</td>
                    <td>{competition.date_fin}</td>
                    <td>{competition.enligne === "1" ? "Oui" : "Non"}</td>
                    <td>{competition.annee_competition}</td>
                    <td className="text-center">
                      <Link
                        to={{
                          pathname: "/ModifierComp",
                          state: {
                            selectedCompetition:
                              JSON.stringify(selectedCompetition),
                          },
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            marginRight: "5px",
                            border: "none",
                            borderRadius: "10%",
                          }}
                        >
                          <MdModeEditOutline />
                        </button>
                      </Link>
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          marginRight: "5px",
                          border: "none",
                          borderRadius: "10%",
                        }}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Project;
