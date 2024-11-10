import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./parametre.css";

// Helper function to group data by budget appellation
const groupBudgetData = (data) => {
  const grouped = {};

  data.forEach((entry) => {
    const {
      budget_appellation,
      budget_date_creation,
      section,
      groupement,
      categorie,
    } = entry;

    // Initialize the budget object if not already present
    if (!grouped[budget_appellation]) {
      grouped[budget_appellation] = {
        budget_appellation,
        budget_date_creation,
        sections: new Set(), // Using Set to avoid duplicate sections
        groupements: new Set(), // Using Set to avoid duplicate groupements
        categories: new Set(), // Using Set to avoid duplicate categories
      };
    }

    // Add unique sections, groupements, and categories
    grouped[budget_appellation].sections.add(section);
    grouped[budget_appellation].groupements.add(groupement);
    if (categorie) grouped[budget_appellation].categories.add(categorie); // Handle null categories
  });

  // Convert Sets to counts and return as an array
  return Object.values(grouped).map((budget) => ({
    ...budget,
    sectionCount: budget.sections.size,
    groupementCount: budget.groupements.size,
    categorieCount: budget.categories.size,
  }));
};

const Parametre = () => {
  const [budgetData, setBudgetData] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (budget) => {
    console.log("Selected Budget Data:", budget); // Debug to see the structure
    navigate("/ModifierLeBudget", { state: { budget } }); // Ensure sections, groupements, and categories are arrays
  };

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost/irc/getBudgetData.php")
      .then((response) => {
        console.log("Raw Budget Data:", response.data); // Debug the raw data
        const groupedData = groupBudgetData(response.data);
        console.log("Grouped Budget Data:", groupedData); // Debug the grouped data
        setBudgetData(groupedData);
      })
      .catch((error) => {
        console.error("Error fetching budget data:", error);
      });
  }, []);

  const handleDuplicate = (budget) => {
    alert(`Dupliquer: ${budget.budget_appellation}`);
    // Logic to duplicate the budget
  };

  const handleDelete = (budget) => {
    if (
      window.confirm(
        `Voulez-vous vraiment supprimer ${budget.budget_appellation} ?`
      )
    ) {
      alert(`Supprimé: ${budget.budget_appellation}`);
      // Logic to delete the budget (e.g., API call to backend)
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content-param">
        <h1>Liste des Budgets avec Sections, Groupements, et Catégories</h1>

        <Link to={"/AjouterUnBudget"}>
          <button className="add-budget-btn">+ Ajouter un Budget</button>
        </Link>

        <table className="budgets-table">
          <thead>
            <tr>
              <th>Appellation Budget</th>
              <th>Date de Création</th>
              <th>Nombre de Sections</th>
              <th>Nombre de Groupements</th>
              <th>Nombre de Catégories</th>
              <th>Actions</th> {/* New Actions Column */}
            </tr>
          </thead>
          <tbody>
            {budgetData.map((budget, index) => (
              <tr key={index}>
                <td>{budget.budget_appellation}</td>
                <td>{budget.budget_date_creation}</td>
                <td>{budget.sectionCount}</td>
                <td>{budget.groupementCount}</td>
                <td>{budget.categorieCount}</td>
                <td>
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(budget)}
                  >
                    Modifier
                  </button>
                  <button
                    className="action-btn duplicate-btn"
                    onClick={() => handleDuplicate(budget)}
                  >
                    Dupliquer
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(budget)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="sidebar">
    <div className="logo-container">
      <img src={logo} alt="IRC Logo" className="logo" />
    </div>
    <Link to="/home" className="sidebar-link">
      <div className="sidebar-item">
        <FaHome className="sidebar-icon" /> Home
      </div>
    </Link>
    <Link to="/admin-projet" className="sidebar-link">
      <div className="sidebar-item">
        <FaFolder className="sidebar-icon" /> Competition
      </div>
    </Link>
    <div className="sidebar-item">
      <FiUsers className="sidebar-icon" /> Utilisateurs
    </div>
    <div className="sidebar-item">
      <FaUserPen className="sidebar-icon" /> Evaluation
    </div>
  </div>
);

export default Parametre;
