import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./parametre.css";

const Parametre = () => {
  const [budgetData, setBudgetData] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (budget) => {
    console.log("Selected Budget Data:", budget);
    navigate("/ModifierLeBudget", { state: { budget } });
  };

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("http://localhost/irc/getBudgetData.php")
      .then((response) => {
        console.log("Budget Data:", response.data);
        setBudgetData(response.data); // Set the data directly since backend handles grouping/counting
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
      // Logic to delete the budget
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
              <th>Actions</th>
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
