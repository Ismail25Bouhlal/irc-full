import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./ModifierLeBudget.css";

const ModifierLeBudget = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const budgetToEdit = location.state?.budget || {};

  const [appelation, setAppelation] = useState(
    budgetToEdit.budget_appellation || ""
  );
  const [creationDate, setCreationDate] = useState(
    budgetToEdit.budget_date_creation ||
      new Date().toISOString().substring(0, 10)
  );

  const [sections, setSections] = useState([...(budgetToEdit.sections || [])]);
  const [groupements, setGroupements] = useState([
    ...(budgetToEdit.groupements || []),
  ]);
  const [categories, setCategories] = useState([
    ...(budgetToEdit.categories || []),
  ]);

  const handleAddRow = (setData, defaultRow) =>
    setData((prev) => [...prev, defaultRow]);

  const handleDeleteRow = (setData, index) =>
    setData((prev) => prev.filter((_, i) => i !== index));

  const handleEditCell = (setData, index, field, value) => {
    setData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleUpdateBudget = () => {
    const updatedBudget = {
      appelation,
      creationDate,
      sections,
      groupements,
      categories,
    };

    axios
      .post("http://localhost/irc/updateBudget.php", updatedBudget)
      .then(() => {
        alert("Budget updated successfully!");
        navigate("/parametre");
      })
      .catch((error) => {
        console.error("Error updating budget:", error);
        alert("Failed to update budget.");
      });
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" className="sidebar-link">
          <div className="sidebar-item">
            <FaHome className="sidebar-icon" />
            Home
          </div>
        </Link>
        <Link to="/admin-projet" className="sidebar-link">
          <div className="sidebar-item">
            <FaFolder className="sidebar-icon" />
            Competition
          </div>
        </Link>
        <div className="sidebar-item">
          <FiUsers className="sidebar-icon" />
          Utilisateurs
        </div>
        <div className="sidebar-item">
          <FaUserPen className="sidebar-icon" />
          Evaluation
        </div>
      </div>

      <div className="content-add">
        <h2 style={{ color: "black" }}>Modifier le Budget</h2>

        <form className="budget-form">
          <div>
            <label htmlFor="appelation">Appellation Budget:</label>
            <input
              type="text"
              id="appelation"
              value={appelation}
              onChange={(e) => setAppelation(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="creationDate">Date de Création:</label>
            <input
              type="date"
              id="creationDate"
              value={creationDate}
              onChange={(e) => setCreationDate(e.target.value)}
            />
          </div>
        </form>

        <div className="table-section">
          <div className="table-header">
            <button
              onClick={() => handleAddRow(setSections, { appelation: "" })}
            >
              Ajouter une Section
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Appellation Section</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={section || ""}
                      onChange={(e) =>
                        handleEditCell(
                          setSections,
                          index,
                          "appelation",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDeleteRow(setSections, index)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-section">
          <div className="table-header">
            <button
              onClick={() => handleAddRow(setGroupements, { appelation: "" })}
            >
              Ajouter un Groupement
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Appellation Groupement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupements.map((groupement, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={groupement || ""}
                      onChange={(e) =>
                        handleEditCell(
                          setGroupements,
                          index,
                          "appelation",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(setGroupements, index)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-section">
          <div className="table-header">
            <button
              onClick={() => handleAddRow(setCategories, { appelation: "" })}
            >
              Ajouter une Catégorie
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Appellation Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((categorie, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={categorie|| ""}
                      onChange={(e) =>
                        handleEditCell(
                          setCategories,
                          index,
                          "appelation",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(setCategories, index)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="enregistrer-button" onClick={handleUpdateBudget}>
          Mettre à jour le Budget
        </button>
      </div>
    </div>
  );
};

export default ModifierLeBudget;
