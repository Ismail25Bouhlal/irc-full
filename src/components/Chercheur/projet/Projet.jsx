import React, { useState, useEffect } from "react";
import { FaHome, FaFolder } from "react-icons/fa";
import "./projet.css";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Projet = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("competition");
  const [competitionsData, setCompetitionsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [competitionsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost/irc/getCompitition.php")
      .then((response) => setCompetitionsData(response.data))
      .catch((error) => console.error("Error fetching competitions:", error));
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const indexOfLastCompetition = currentPage * competitionsPerPage;
  const indexOfFirstCompetition = indexOfLastCompetition - competitionsPerPage;
  const currentCompetitions = competitionsData.slice(
    indexOfFirstCompetition,
    indexOfLastCompetition
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderCompetitionCard = (competitionData) => {
    return (
      <div className="competition-card">
        <h3 className="card-title">{competitionData.titre}</h3>
        <p>
          <strong>Libellé:</strong> {competitionData.libelle}
        </p>
        <p>
          <strong>Date de début:</strong> {competitionData.date_debut}
        </p>
        <p>
          <strong>Date de fin:</strong> {competitionData.date_fin}
        </p>
        <p>
          <strong>En ligne:</strong>{" "}
          {competitionData.enligne === "1" ? "Oui" : "Non"}
        </p>
        <p>
          <strong>Année de compétition:</strong>{" "}
          {competitionData.annee_competition}
        </p>
        <div className="action">
          {competitionData.enligne === "1" ? (
            <Link to={"/Forum_ProjectChercheur"}>
              <button
                className="apply-button"
                onClick={() => console.log("Apply clicked")}
              >
                Appliquer
              </button>
            </Link>
          ) : (
            <span className="unavailable">Non disponible</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`projet-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar">
        <>
          <div className="logo-container">
            <img src={logo} alt="IRC Logo" className="logo" />
          </div>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <div className="sidebar-item" onClick={handleToggleSidebar}>
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
        </>
      </div>
      <div className="content">
        {selectedItem === "competition" && (
          <div className="competition-container">
            {currentCompetitions.map((competition, index) => (
              <div key={index}>{renderCompetitionCard(competition)}</div>
            ))}
          </div>
        )}
        {/* Pagination */}
        {competitionsData.length > competitionsPerPage && (
          <ul className="pagination">
            {Array(Math.ceil(competitionsData.length / competitionsPerPage))
              .fill()
              .map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Projet;
