import React, { useState } from "react";
import { FaHome, FaFolder, FaFolderPlus } from "react-icons/fa";
import "./projet.css";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";

const Projet = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderCompetitionCard = (competitionData) => {
    return (
      <div className="competition-card">
        <h3 className="card-title">{competitionData.name}</h3>
        <p>
          <strong>Date debut:</strong> {competitionData.startDate}
        </p>
        <p>
          <strong>Date de fin:</strong> {competitionData.endDate}
        </p>
        <p>
          <strong>Description:</strong> {competitionData.description}
        </p>
        <div className="action">
          {competitionData.isOpen ? (
            <button
              className="apply-button"
              onClick={() => console.log("Apply clicked")}
            >
              Appliquer
            </button>
          ) : (
            <span className="unavailable">Non disponible</span>
          )}
        </div>
      </div>
    );
  };

  // Simulated data for multiple competitions
  const competitionsData = [
    {
      name: "Competition 1",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "This is a sample competition description",
      isOpen: true,
    },
    {
      name: "Competition 2",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "This is a sample competition description",
      isOpen: false,
    },
    {
      name: "Competition 3",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "This is a sample competition description",
      isOpen: true,
    },
    {
      name: "Competition 4",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "This is a sample competition description",
      isOpen: true,
    },
    {
      name: "Competition 5",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "This is a sample competition description",
      isOpen: true,
    },
    {
      name: "Competition 6",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      description: "This is a sample competition description",
      isOpen: false,
    },
    // Add more competition data as needed
  ];

  return (
    <div className={`projet-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar">
        <>
          <div className="logo-container">
            {/* Your logo component goes here */}
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
          <div
            className={`sidebar-item ${
              selectedItem === "ajouter" ? "active" : ""
            }`}
            onClick={() => handleItemClick("ajouter")}
          >
            <FaFolderPlus style={{ marginRight: "8px" }} />
            Ajouter une competition
          </div>
        </>
      </div>
      <div className="content">
        {selectedItem === "competition" && (
          <div className="competition-container">
            {competitionsData.map((competition, index) => (
              <div key={index}>{renderCompetitionCard(competition)}</div>
            ))}
          </div>
        )}
        {selectedItem === "ajouter" && (
          <div className="add-competition">
            {/* Content for "Ajouter une competition" */}
            <div className="app-card-body">
              <form className="settings-form" id="create-competition-form">
                <h2>Ajouter une competition</h2>
                <div className="mb-3">
                  <label htmlFor="nom_compt" className="form-label">
                    Nom de la competition
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nom_compt"
                    placeholder="Nom de la competition"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="libelle_compt" className="form-label">
                    Libelle
                    <span
                      className="ms-2"
                      data-bs-container="body"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover focus"
                      data-bs-placement="top"
                      data-bs-content="Libelle."
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-info-circle"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                        <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                        <circle cx="8" cy="4.5" r="1" />
                      </svg>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="libelle_compt"
                    placeholder="Libelle"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date_debut_compt" className="form-label">
                    Date début
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_debut_compt"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date_fin_compt" className="form-label">
                    Date fin
                  </label>
                  <input
                    type="date"
                    id="date_fin_compt"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="annee_compt" className="form-label">
                    Année de la compétition
                  </label>
                  <input
                    type="text"
                    id="annee_compt"
                    className="form-control"
                    placeholder="Année ( ex : 2023)"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">En ligne :</label>
                  <label>
                    Non <input type="radio" name="enligne" value="2" />
                  </label>
                  <label>
                    Oui <input type="radio" name="enligne" value="1" />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label">Lier avec un formulaire</label>
                  <span style={{ fontSize: "12px" }}>
                    <a href="#">Créer un formulaire</a>
                  </span>
                  <span
                    className="ms-2"
                    data-bs-container="body"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-placement="top"
                    data-bs-content="Chaque competiton doit être lier avec un formulaire.Veuillez créer un formulaire à partir de la page formulaire."
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-info-circle"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                      <circle cx="8" cy="4.5" r="1" />
                    </svg>
                  </span>
                  <select
                    className="formulaire_id form-control"
                    name="formulaire"
                  >
                    <option value="0">Choisissez...</option>
                    {/* Map through your list_form data and render options */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="grille_compt" className="form-label">
                    Lier avec une grille d'évaluation
                  </label>
                  <span style={{ fontSize: "12px" }}>
                    <a href="#">Créer une grille d'évaluation</a>
                  </span>
                  <span
                    className="ms-2"
                    data-bs-container="body"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-placement="top"
                    data-bs-content="Chaque competiton doit être lier avec une grille d'évaluation.Veuillez créer une grille à partir de la page Grille d'évaluation."
                  >
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-info-circle"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                      <circle cx="8" cy="4.5" r="1" />
                    </svg>
                  </span>
                  <select
                    className="grille_id form-control"
                    name="grille_evaluation"
                  >
                    <option value="0">Choisissez...</option>
                    {/* Map through your list_grille data and render options */}
                  </select>
                </div>
                <div id="message-container"></div>
                <button type="submit" className="btn app-btn-primary">
                  Enregistrer
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projet;
