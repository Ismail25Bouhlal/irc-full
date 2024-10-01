import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./projet.css";
import { useLocation } from "react-router-dom";

const Modification = () => {
  const location = useLocation();
  console.log(location.state); // Log location.state to check its value
  const selectedCompetition = location.state
    ? location.state.selectedCompetition
    : null;
  const [showForm, setShowForm] = useState(false);


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
      <div className="content">
          <div style={{ marginRight: "40%" }}>
            <div className="add-competition">
              <div className="app-card-body">
                <form
                  className="settings-form"
                  id="create-competition-form"
                  // onSubmit={handleSubmit}
                >
                  <h2 style={{color:"black"}}>Modifier une competition</h2>
                  <div className="mb-3">
                    <label htmlFor="titre" className="form-label" >
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
                  <div className="mb-3" style={{color:"black"}}>
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
          </div>
      </div>
    </div>
  );
};

export default Modification;
