import React, { useState } from "react";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";
import "./AjouterUnBudget.css";

const AjouterUnBudget = () => {
  const [appelation, setAppelation] = useState("");
  const [creationDate, setCreationDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [sectionAppelation, setSectionAppelation] = useState("");
  const [sectionDate, setSectionDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [groupAppelation, setGroupAppelation] = useState("");
  const [groupSection, setGroupSection] = useState("");
  const [categorieAppelation, setCategorieAppelation] = useState("");
  const [categorieGroupment, setCategorieGroupment] = useState("");

  const [sections, setSections] = useState([]);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isSectionFormOpen, setIsSectionFormOpen] = useState(false);
  const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);
  const [isCategorieFormOpen, setIsCategorieFormOpen] = useState(false);

  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [editingGroupIndex, setEditingGroupIndex] = useState(null);
  const [editingCategorieIndex, setEditingCategorieIndex] = useState(null);

  const handleAppelationChange = (e) => {
    setAppelation(e.target.value);
  };

  const handleSectionAppelationChange = (e) => {
    setSectionAppelation(e.target.value);
  };

  const handleGroupAppelationChange = (e) => {
    setGroupAppelation(e.target.value);
  };

  const handleGroupSectionChange = (e) => {
    setGroupSection(e.target.value);
  };

  const handleCategorieAppelationChange = (e) => {
    setCategorieAppelation(e.target.value);
  };

  const handleCategorieGroupmentChange = (e) => {
    setCategorieGroupment(e.target.value);
  };

  const handleOpenSectionForm = () => {
    setIsSectionFormOpen(true);
    setSectionAppelation("");
    setSectionDate(new Date().toISOString().substring(0, 10));
    setEditingSectionIndex(null); // Reset edit mode
  };

  const handleOpenGroupForm = () => {
    setIsGroupFormOpen(true);
    setGroupAppelation("");
    setGroupSection("");
    setEditingGroupIndex(null); // Reset edit mode
  };

  const handleOpenCategorieForm = () => {
    setIsCategorieFormOpen(true);
    setCategorieAppelation("");
    setCategorieGroupment("");
    setEditingCategorieIndex(null); // Reset edit mode
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    if (editingSectionIndex !== null) {
      const updatedSections = sections.map((section, index) =>
        index === editingSectionIndex
          ? {
              ...section,
              appelation: sectionAppelation,
              creationDate: sectionDate,
            }
          : section
      );
      setSections(updatedSections);
    } else {
      const newSection = {
        id: sections.length + 1,
        appelation: sectionAppelation,
        creationDate: sectionDate,
      };
      setSections([...sections, newSection]);
    }
    setIsSectionFormOpen(false);
  };

  const handleGroupSubmit = (e) => {
    e.preventDefault();
    if (editingGroupIndex !== null) {
      const updatedGroups = groups.map((group, index) =>
        index === editingGroupIndex
          ? { ...group, appelation: groupAppelation, groupement: groupSection }
          : group
      );
      setGroups(updatedGroups);
    } else {
      const newGroup = {
        id: groups.length + 1,
        appelation: groupAppelation,
        groupement: groupSection,
        creationDate: new Date().toISOString().substring(0, 10),
      };
      setGroups([...groups, newGroup]);
    }
    setIsGroupFormOpen(false);
  };

  const handleCategorieSubmit = (e) => {
    e.preventDefault();
    if (editingCategorieIndex !== null) {
      const updatedCategories = categories.map((categorie, index) =>
        index === editingCategorieIndex
          ? {
              ...categorie,
              appelation: categorieAppelation,
              groupement: categorieGroupment,
            }
          : categorie
      );
      setCategories(updatedCategories);
    } else {
      const newCategorie = {
        id: categories.length + 1,
        appelation: categorieAppelation,
        groupement: categorieGroupment,
        creationDate: new Date().toISOString().substring(0, 10),
      };
      setCategories([...categories, newCategorie]);
    }
    setIsCategorieFormOpen(false);
  };

  const handleDeleteSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };



  const handleDeleteGroup = (index) => {
    const updatedGroups = groups.filter((_, i) => i !== index);
    setGroups(updatedGroups);
  };

  const handleDeleteCategorie = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleEditSection = (index) => {
    setEditingSectionIndex(index);
    const section = sections[index];
    setSectionAppelation(section.appelation);
    setSectionDate(section.creationDate);
    setIsSectionFormOpen(true);
  };

  const handleEditGroup = (index) => {
    setEditingGroupIndex(index);
    const group = groups[index];
    setGroupAppelation(group.appelation);
    setGroupSection(group.groupement);
    setIsGroupFormOpen(true);
  };

  const handleEditCategorie = (index) => {
    setEditingCategorieIndex(index);
    const categorie = categories[index];
    setCategorieAppelation(categorie.appelation);
    setCategorieGroupment(categorie.groupement);
    setIsCategorieFormOpen(true);
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
        <Link to={"/admin-projet"} className="sidebar-link">
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
        {/* Form for Budget */}
        <form className="budget-form">
          <div>
            <label htmlFor="appelation" style={{ color: "black" }}>
              Appelation Budget:
            </label>
            <input
              type="text"
              id="appelation"
              value={appelation}
              onChange={handleAppelationChange}
              placeholder="Enter budget name"
            />
          </div>
          <div>
            <label htmlFor="creationDate" style={{ color: "black" }}>
              Date de Création:
            </label>
            <input
              type="date"
              id="creationDate"
              value={creationDate}
              readOnly
            />
          </div>
        </form>

        {/* First Table Section */}
        <div className="table-section">
          <div className="table-header">
            <button onClick={handleOpenSectionForm}>Nouveau Section</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Appelation Section</th>
                <th>Date de Création</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, index) => (
                <tr key={section.id}>
                  <td>{section.id}</td>
                  <td>{section.appelation}</td>
                  <td>{section.creationDate}</td>
                  <td>
                    <button onClick={() => handleDeleteSection(index)}>
                      Supprimer
                    </button>
                    <button onClick={() => handleEditSection(index)}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isSectionFormOpen && (
          <div className="modal">
            <form className="modal-content section-form" onSubmit={handleSectionSubmit}>
              <h2>
                {editingSectionIndex !== null
                  ? "Modifier Section"
                  : "Ajouter Section"}
              </h2>
              <div>
                <label htmlFor="sectionAppelation" style={{ color: "black" }}>
                  Appelation Section:
                </label>
                <input
                  type="text"
                  id="sectionAppelation"
                  value={sectionAppelation}
                  onChange={handleSectionAppelationChange}
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <label htmlFor="sectionDate" style={{ color: "black" }}>
                  Date de Création:
                </label>
                <input
                  type="date"
                  id="sectionDate"
                  value={sectionDate}
                  readOnly
                />
              </div>
              <button type="submit">
                {editingSectionIndex !== null ? "Modifier" : "Ajouter"}
              </button>
            </form>
            </div>
          )}
        </div>

        {/* Second Table Groupement */}
        <div className="table-section">
          <div className="table-header">
            <button onClick={handleOpenGroupForm}>Nouveau Groupement</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Appelation Groupement</th>
                <th>Appelation Section</th>
                <th>Date de Création</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group.id}>
                  <td>{group.id}</td>
                  <td>{group.appelation}</td>
                  <td>{group.groupement}</td>
                  <td>{group.creationDate}</td>
                  <td>
                    <button onClick={() => handleDeleteGroup(index)}>
                      Supprimer
                    </button>
                    <button onClick={() => handleEditGroup(index)}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isGroupFormOpen && (
            <form className="group-form" onSubmit={handleGroupSubmit}>
              <h3>
                {editingGroupIndex !== null
                  ? "Modifier Groupement"
                  : "Ajouter Groupement"}
              </h3>
              <div>
                <label htmlFor="groupAppelation" style={{ color: "black" }}>
                  Appelation Groupement:
                </label>
                <input
                  type="text"
                  id="groupAppelation"
                  value={groupAppelation}
                  onChange={handleGroupAppelationChange}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <label htmlFor="groupSection" style={{ color: "black" }}>
                  Appelation Section:
                </label>
                <select
                  id="groupSection"
                  value={groupSection}
                  onChange={handleGroupSectionChange}
                >
                  <option value="">Select Section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.appelation}>
                      {section.appelation}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="creationDate" style={{ color: "black" }}>
                  Date de Création:
                </label>
                <input
                  type="date"
                  id="creationDate"
                  value={new Date().toISOString().substring(0, 10)}
                  readOnly
                />
              </div>
              <button type="submit">
                {editingGroupIndex !== null ? "Modifier" : "Ajouter"}
              </button>
            </form>
          )}
        </div>

        {/* Third Table Categorie */}
        <div className="table-section">
          <div className="table-header">
            <button onClick={handleOpenCategorieForm}>Nouveau Categorie</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Appelation Categorie</th>
                <th>Appelation Groupement</th>
                <th>Date de Création</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((categorie, index) => (
                <tr key={categorie.id}>
                  <td>{categorie.id}</td>
                  <td>{categorie.appelation}</td>
                  <td>{categorie.groupement}</td>
                  <td>{categorie.creationDate}</td>
                  <td>
                    <button onClick={() => handleDeleteCategorie(index)}>
                      Supprimer
                    </button>
                    <button onClick={() => handleEditCategorie(index)}>
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isCategorieFormOpen && (
            <form className="categorie-form" onSubmit={handleCategorieSubmit}>
              <h3>
                {editingCategorieIndex !== null
                  ? "Modifier Categorie"
                  : "Ajouter Categorie"}
              </h3>
              <div>
                <label htmlFor="categorieAppelation" style={{ color: "black" }}>
                  Appelation Categorie:
                </label>
                <input
                  type="text"
                  id="categorieAppelation"
                  value={categorieAppelation}
                  onChange={handleCategorieAppelationChange}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label htmlFor="categorieGroupment" style={{ color: "black" }}>
                  Appelation Groupement:
                </label>
                <select
                  id="categorieGroupment"
                  value={categorieGroupment}
                  onChange={handleCategorieGroupmentChange}
                >
                  <option value="">Select Groupement</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.appelation}>
                      {group.appelation}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="creationDate" style={{ color: "black" }}>
                  Date de Création:
                </label>
                <input
                  type="date"
                  id="creationDate"
                  value={new Date().toISOString().substring(0, 10)}
                  readOnly
                />
              </div>
              <button type="submit">
                {editingCategorieIndex !== null ? "Modifier" : "Ajouter"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AjouterUnBudget;
