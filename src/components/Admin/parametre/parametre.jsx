import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./parametre.css";

const Parametre = () => {
  const [budgets, setBudgets] = useState([
    {
      appellation: "Budget AAP2024",
      dateCreation: "26/09/2024",
      nbrLigneN1: 4,
      nbrLigneN2: 4,
      nbrLigneN3: 4,
    },
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newBudget, setNewBudget] = useState({
    appellation: "",
    dateCreation: new Date().toLocaleDateString("en-GB"),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddBudgetClick = () => {
    setIsFormVisible(true);
    setIsEditing(false);
    setNewBudget({
      appellation: "",
      dateCreation: new Date().toLocaleDateString("en-GB"),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedBudgets = [...budgets];
      updatedBudgets[editingIndex] = newBudget;
      setBudgets(updatedBudgets);
      setIsEditing(false);
      setEditingIndex(null);
    } else {
      setBudgets([...budgets, newBudget]);
    }
    setIsFormVisible(false);
    setNewBudget({
      appellation: "",
      dateCreation: new Date().toLocaleDateString("en-GB"),
    });
  };

  const handleDelete = (index) => {
    setBudgets(budgets.filter((_, i) => i !== index));
  };

  const handleDuplicate = (index) => {
    const budgetToDuplicate = budgets[index];
    const newBudget = {
      ...budgetToDuplicate,
      appellation: `${budgetToDuplicate.appellation} (dupliqué)`,
    };
    setBudgets([...budgets, newBudget]);
  };

  const handleEdit = (index) => {
    setNewBudget(budgets[index]);
    setIsFormVisible(true);
    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
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
      <div className="content-param">
        <h1>Liste des Budgets Crees</h1>
        <Link to={"/AjouterUnBudget"}>
          <button className="add-budget-btn">+ Ajouter un Budget</button>
        </Link>
        <table className="budgets-table">
          <thead>
            <tr>
              <th>Appellation</th>
              <th>Date de creation</th>
              <th>NBR Ligne N1</th>
              <th>NBR Ligne N2</th>
              <th>NBR Ligne N3</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget, index) => (
              <tr key={index}>
                <td>{budget.appellation}</td>
                <td>{budget.dateCreation}</td>
                <td>{budget.nbrLigneN1}</td>
                <td>{budget.nbrLigneN2}</td>
                <td>{budget.nbrLigneN3}</td>
                <td>
                  <button
                    className="modify-btn"
                    onClick={() => handleEdit(index)}
                  >
                    modifier
                  </button>
                  <button
                    className="modify-btn"
                    onClick={() => handleDuplicate(index)}
                  >
                    dupliquer
                  </button>
                  <button
                    className="modify-btn"
                    onClick={() => handleDelete(index)}
                  >
                    supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isFormVisible && (
          <div className="popup">
            <div className="popup-inner">
              <form onSubmit={handleFormSubmit} className="budget-form">
                <h2>
                  {isEditing ? "Modifier le Budget" : "Ajouter un Budget"}
                </h2>
                <label>
                  Appellation:
                  <input
                    type="text"
                    name="appellation"
                    value={newBudget.appellation}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Date de creation:
                  <input
                    type="text"
                    name="dateCreation"
                    value={newBudget.dateCreation}
                    onChange={handleInputChange}
                    readOnly
                  />
                </label>
                <button type="submit" className="submit-btn">
                  {isEditing ? "Modifier" : "Ajouter"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsFormVisible(false)}
                >
                  Annuler
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parametre;
