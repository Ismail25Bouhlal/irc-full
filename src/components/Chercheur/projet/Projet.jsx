import React, { useState, useEffect } from "react";
import { FaHome, FaFolder } from "react-icons/fa";
import "./projet.css";
import logo from "../../../assets/irc-logo-rb.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Projet = () => {
  const [competitionsData, setCompetitionsData] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("competition");
  const [currentPage, setCurrentPage] = useState(1);
  const [competitionsPerPage] = useState(5);
  const navigate = useNavigate();

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

  const handleApplyClick = async (input) => {
    const selectedCompetition =
      typeof input === "object"
        ? input
        : competitionsData.find((c) => c.idcompetition === input);

    if (!selectedCompetition) {
      console.error("Competition not found!");
      return;
    }

    console.log("Selected Competition:", selectedCompetition);

    try {
      const response = await axios.get(
        "http://localhost/irc/projets.php?action=getLastProjectId"
      );

      if (response.data.status === "success") {
        const lastProjectId = Number(response.data.data.lastProjectId) || 0;
        const newProjectId = lastProjectId + 1;

        navigate("/Forum_ProjectChercheur", {
          state: {
            budgetParametreId: selectedCompetition.ID_budget_parametre,
            projectId: newProjectId,
          },
        });
        console.log("Selected Competition:", selectedCompetition);
        console.log(
          "ID_budget_parametre:",
          selectedCompetition?.ID_budget_parametre
        );
      } else {
        alert("Failed to fetch the last project ID: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching the last project ID:", error);
      alert("There was an error fetching the last project ID!");
    }
  };

  // Filter only competitions that are online
  const filteredCompetitions = competitionsData.filter(
    (competition) => competition.enligne === "1"
  );

  // Calculate indices for pagination
  const indexOfLastCompetition = currentPage * competitionsPerPage;
  const indexOfFirstCompetition = indexOfLastCompetition - competitionsPerPage;
  const currentCompetitions = filteredCompetitions.slice(
    indexOfFirstCompetition,
    indexOfLastCompetition
  );

  // Calculate total pages based on filtered competitions
  const totalPages = Math.ceil(
    filteredCompetitions.length / competitionsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`projet-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar">
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
        <Link
          to="/MyProject"
          className="sidebar-item"
          style={{ textDecoration: "none" }}
        >
          <FaFolder style={{ marginRight: "8px" }} />
          My Project
        </Link>
      </div>
      <div className="content">
        {selectedItem === "competition" && (
          <div className="competition-container">
            {currentCompetitions.map((competition) => (
              <div className="competition-card" key={competition.idcompetition}>
                <h3 className="card-title">{competition.titre}</h3>
                <p>
                  <strong>Libellé:</strong> {competition.libelle}
                </p>
                <p>
                  <strong>Date de début:</strong> {competition.date_debut}
                </p>
                <p>
                  <strong>Date de fin:</strong> {competition.date_fin}
                </p>
                <p>
                  <strong>Année de compétition:</strong>{" "}
                  {competition.annee_competition}
                </p>
                <div className="action">
                  {competition.enligne === "1" ? (
                    <button
                      className="apply-button"
                      onClick={() =>
                        handleApplyClick(competition.idcompetition)
                      }
                    >
                      Appliquer
                    </button>
                  ) : (
                    <span className="unavailable">Non disponible</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="pagination-container">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Projet;
