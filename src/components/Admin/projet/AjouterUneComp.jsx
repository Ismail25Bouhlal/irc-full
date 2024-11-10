import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import "./projet.css";
import logo from "../../../assets/irc-logo-rb.png";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AjouterUneComp = () => {
  const [selectedBudget, setSelectedBudget] = useState("");
  const [budgets, setBudgets] = useState([]); // State to store fetched budgets

  // Fetch the list of budgets when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost/irc/getBudgets.php") // Adjust path as needed
      .then((response) => {
        console.log("Fetched Budgets:", response.data); // Debug the response
        setBudgets(response.data); // Set the fetched budget data
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  }, []);

  const handleChange = (e) => {
    console.log("Selected Budget ID:", e.target.value); // Should print only the ID
    setSelectedBudget(e.target.value); // Update state with only the ID
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Confirm that selectedBudget has only the ID
    console.log("Selected Budget ID for submission:", selectedBudget);

    const formData = new FormData(event.target);

    // Ensure only the ID is included in FormData
    formData.set("ID_budget_parametre", selectedBudget);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`); // Ensure only the ID is sent
    }

    try {
      const response = await axios.post(
        "http://localhost/irc/addCompetitions.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Success:", response.data);
        alert("La compétition a été ajoutée avec succès.");
        event.target.reset();
        setSelectedBudget("");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Une erreur est survenue lors de l'ajout de la compétition.");
    }
  };

  return (
    <>
      <div className="d-flex">
        <div className="sidebar">
          <>
            <div className="logo-container">
              <img src={logo} alt="IRC Logo" className="logo" />
            </div>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <div className="sidebar-item">
                <FaHome style={{ marginRight: "8px" }} />
                Home
              </div>
            </Link>
            <Link to={"/admin-projet"}>
              <div className="sidebar-item">
                <FaFolder style={{ marginRight: "8px" }} />
                Competition
              </div>
            </Link>
            <div className="sidebar-item">
              <FiUsers style={{ marginRight: "8px" }} />
              Utilisateurs
            </div>
            <div className="sidebar-item">
              <FaUserPen style={{ marginRight: "8px" }} />
              Evaluation
            </div>
          </>
        </div>
        <div style={{ marginLeft: "130%" }}>
          <div className="add-competition">
            <div className="app-card-body">
              <form
                className="settings-form"
                id="create-competition-form"
                onSubmit={handleSubmit}
              >
                <h2 style={{ color: "black" }}>Ajouter une competition</h2>
                <div className="mb-3">
                  <label htmlFor="titre" className="form-label">
                    Nom de la competition
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="titre"
                    name="titre"
                    placeholder="Nom de la competition"
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
                    name="libelle"
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
                    required
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
                    name="annee_competition"
                    placeholder="Année ( ex : 2023)"
                    required
                  />
                </div>
                <div className="mb-3" style={{ color: "black" }}>
                  <label className="form-label">En ligne :</label>
                  <label>
                    Non <input type="radio" name="enligne" value="2" />
                  </label>
                  <label>
                    Oui <input type="radio" name="enligne" value="1" />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="budget" className="form-label">
                    Budget
                  </label>
                  <select
                    id="budget"
                    name="ID_budget_parametre" // Backend expects this name
                    className="form-control"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)} // Update selectedBudget with only the ID
                    required
                  >
                    <option value="">Select Budget</option>
                    {budgets.map((budget) => (
                      <option key={budget.id} value={budget.id}>
                        {" "}
                        {/* value is only the ID */}
                        {budget.appellation} {/* Display the name */}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn app-btn-primary">
                  Enregistrer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AjouterUneComp;
