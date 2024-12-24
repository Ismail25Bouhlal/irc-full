import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./projet.css";

const Modification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Make sure location.state is available and extract selectedCompetition
  const selectedCompetition = location.state?.selectedCompetition || {};

  // Initialize form state with competition data or defaults
  const [titre, setTitre] = useState(selectedCompetition.titre || "");
  const [libelle, setLibelle] = useState(selectedCompetition.libelle || "");
  const [dateDebut, setDateDebut] = useState(
    selectedCompetition.date_debut || ""
  );
  const [dateFin, setDateFin] = useState(selectedCompetition.date_fin || "");
  const [anneeCompetition, setAnneeCompetition] = useState(
    selectedCompetition.annee_competition || ""
  );
  const [enLigne, setEnLigne] = useState(selectedCompetition.enligne || "2");

  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/irc/getBudgets.php")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", {
      titre,
      libelle,
      dateDebut,
      dateFin,
      anneeCompetition,
      enLigne,
      selectedBudget,
    });

    // Navigate back to the competition list after submission
    navigate("/admin-projet");
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <>
          <div className="logo-container">
            <img src={logo} alt="IRC Logo" className="logo" />
          </div>
          <Link to="/home" className="sidebar-item">
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </Link>
          <Link to="/admin-projet" className="sidebar-item">
            <FaFolder style={{ marginRight: "8px" }} />
            Competition
          </Link>
          <Link to="/Utislisatuers" className="sidebar-item">
            <FiUsers style={{ marginRight: "8px" }} />
            Utilisateurs
          </Link>
          <div className="sidebar-item">
            <FaUserPen style={{ marginRight: "8px" }} />
            Evaluation
          </div>
        </>
      </div>
      <div className="main-container">
        <div className="form-card">
          <h2 className="form-title">Modifier une competition</h2>
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="titre" className="form-label">
                Nom de la competition
              </label>
              <input
                type="text"
                className="form-control"
                id="titre"
                name="titre"
                placeholder="Nom de la competition"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="libelle" className="form-label">
                Libelle
              </label>
              <input
                type="text"
                className="form-control"
                id="libelle"
                name="libelle"
                placeholder="Libelle"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_debut" className="form-label">
                Date début
              </label>
              <input
                type="date"
                className="form-control"
                id="date_debut"
                name="date_debut"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_fin" className="form-label">
                Date fin
              </label>
              <input
                type="date"
                id="date_fin"
                className="form-control"
                name="date_fin"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                required
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="annee_competition" className="form-label">
                Année de la compétition
              </label>
              <input
                type="text"
                id="annee_competition"
                className="form-control"
                name="annee_competition"
                placeholder="Année (ex: 2023)"
                value={anneeCompetition}
                onChange={(e) => setAnneeCompetition(e.target.value)}
                required
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">En ligne :</label>
              <div className="radio-group">
                <label>
                  Non{" "}
                  <input
                    type="radio"
                    name="enligne"
                    value="2"
                    checked={enLigne === "2"}
                    onChange={() => setEnLigne("2")}
                  />
                </label>
                <label>
                  Oui{" "}
                  <input
                    type="radio"
                    name="enligne"
                    value="1"
                    checked={enLigne === "1"}
                    onChange={() => setEnLigne("1")}
                  />
                </label>
              </div>
            </div>
            <div className="form-group full-width">
              <label htmlFor="budget" className="form-label">
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                className="form-control"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                required
              >
                <option value="">Select Budget</option>
                {budgets.map((budget) => (
                  <option
                    key={budget.ID_budget_parametre}
                    value={budget.ID_budget_parametre}
                  >
                    {budget.appellation}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="submit-button">
              Enregistrer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modification;
