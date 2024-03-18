import React, { useState, useEffect } from "react";
import { FaHome, FaFolder, FaFolderPlus } from "react-icons/fa";
import "./projet.css";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Projet = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [competitionData, setCompetitionData] = useState(null);
  const [editedCompetition, setEditedCompetition] = useState(null);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const handleEditClick = (competition) => {
    setSelectedItem("ajouter"); // Display the form for editing
    setEditedCompetition(competition); // Set the competition to be edited
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      let response;

      if (editedCompetition) {
        // If editedCompetition is not null, it means we're editing an existing competition
        formData.append("action", "modifyCompetition"); // Include the action type
        formData.append("competition_id", editedCompetition.id); // Include the competition ID in the form data

        response = await axios.post(
          "http://localhost/irc/addCompetition.php", // Backend endpoint for editing competition
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // If editedCompetition is null, it means we're adding a new competition
        formData.append("action", "addCompetition"); // Include the action type

        response = await axios.post(
          "http://localhost/irc/addCompetition.php", // Backend endpoint for adding competition
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (response.status === 200) {
        console.log("Success:", response.data);
        alert("La compétition a été modifiée avec succès."); // Display success message
        fetchCompetitionData(); // Fetch competition data after successful form submission
        form.reset(); // Reset the form fields
        setSelectedItem("competition"); // Switch back to competition view after successful submission
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Une erreur est survenue lors de la modification de la compétition."
      ); // Display error message
    }
  };

  const fetchCompetitionData = () => {
    axios
      .get("http://localhost/irc/getCompetitions.php")
      .then((response) => {
        console.log("Fetched competition data:", response.data);
        setCompetitionData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching competition data:", error);
      });
  };

  useEffect(() => {
    fetchCompetitionData();
  }, []);

  console.log(fetchCompetitionData);

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
        {selectedItem === "competition" && Array.isArray(competitionData) && (
          <div className="competition-container">
            {competitionData.map((competition, index) => (
              <div key={index} className="competition-card">
                <h3 className="card-title">{competition.titre}</h3>
                <p>
                  <strong>Description:</strong> {competition.libelle}
                </p>
                <p>
                  <strong>Date début:</strong> {competition.date_debut}
                </p>
                <p>
                  <strong>Date de fin:</strong> {competition.date_fin}
                </p>
                <div className="action">
                  {competition.enligne === 1 ? (
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
                <button onClick={() => handleEditClick(competition)}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedItem === "ajouter" && (
          <div className="add-competition">
            <div className="app-card-body">
              <form
                className="settings-form"
                id="create-competition-form"
                onSubmit={handleSubmit}
              >
                <h2>Ajouter une competition</h2>
                <div className="mb-3">
                  <label htmlFor="titre" className="form-label">
                    Nom de la competition
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Nom de la competition"
                    name="titre"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="libelle" className="form-label">
                    Libelle
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="libelle"
                    placeholder="Libelle"
                    name="libelle"
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
                    id="date_debut"
                    name="date_debut"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date_fin_compt" className="form-label">
                    Date fin
                  </label>
                  <input
                    type="date"
                    id="date_fin"
                    className="form-control"
                    name="date_fin"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="annee_compt" className="form-label">
                    Année de la compétition
                  </label>
                  <input
                    type="text"
                    id="annee_competition"
                    className="form-control"
                    placeholder="Année ( ex : 2023)"
                    name="annee_competition"
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
