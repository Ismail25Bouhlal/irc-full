import React, { useState, useEffect } from "react";
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

  // Fetching budget data from the Parametre component
  const budgetToEdit = location.state?.budget || {};
  console.log("Budget to Edit:", budgetToEdit);

  // Initializing state variables
  const [appelation, setAppelation] = useState(
    budgetToEdit.budget_appellation || ""
  );
  const [creationDate, setCreationDate] = useState(
    budgetToEdit.budget_date_creation ||
      new Date().toISOString().substring(0, 10)
  );
  const [id, setId] = useState(budgetToEdit.id || "");

  // Initialize sections, groupements, and categories
  const [sections, setSections] = useState(budgetToEdit.sections || []);
  const [groupements, setGroupements] = useState(
    budgetToEdit.groupements || []
  );
  const [categories, setCategories] = useState(budgetToEdit.categories || []);

  useEffect(() => {
    console.log("Appellation:", appelation);
    console.log("Creation Date:", creationDate);
    console.log("Sections:", sections);
    console.log("Groupements:", groupements);
    console.log("Categories:", categories);
  }, [appelation, creationDate, sections, groupements, categories]);

  const handleAddRow = (setData, defaultRow) =>
    setData((prev) => [...prev, defaultRow]);

  const handleDeleteRow = (setData, index) =>
    setData((prev) => prev.filter((_, i) => i !== index));

  const handleEditCell = (setData, index, value) => {
    setData((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleUpdateBudget = () => {
    const updatedBudget = {
      id: budgetToEdit.id, // Pass the ID of the budget to update
      appelation,
      creationDate,
      sections: sections.map((section, index) => ({
        id: section.id || null, // Pass existing ID or null for new entries
        appellation: section,
      })),
      groupements: groupements.map((groupement, index) => ({
        id: groupement.id || null, // Pass existing ID or null for new entries
        appellation: groupement,
      })),
      categories: categories.map((categorie, index) => ({
        id: categorie.id || null, // Pass existing ID or null for new entries
        appellation: categorie,
      })),
    };

    axios
      .post("http://localhost/irc/updateBudget.php", updatedBudget)
      .then((response) => {
        if (response.data.updatedData) {
          console.log("Updated Budget Data:", response.data.updatedData);
          alert("Budget updated successfully!");
          navigate("/parametre", {
            state: { updatedData: response.data.updatedData },
          });
        } else {
          alert("Budget updated successfully, but no updated data returned.");
          navigate("/parametre");
        }
      })
      .catch((error) => {
        console.error("Error updating budget:", error);
        alert("Failed to update budget.");
      });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
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

      {/* Main Content */}
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

        {/* Sections */}
        <div className="table-section">
          <div className="table-header">
            <button onClick={() => handleAddRow(setSections, "")}>
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
                        handleEditCell(setSections, index, e.target.value)
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

        {/* Groupements */}
        <div className="table-section">
          <div className="table-header">
            <button onClick={() => handleAddRow(setGroupements, "")}>
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
                        handleEditCell(setGroupements, index, e.target.value)
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

        {/* Categories */}
        <div className="table-section">
          <div className="table-header">
            <button onClick={() => handleAddRow(setCategories, "")}>
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
                      value={categorie || ""}
                      onChange={(e) =>
                        handleEditCell(setCategories, index, e.target.value)
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
