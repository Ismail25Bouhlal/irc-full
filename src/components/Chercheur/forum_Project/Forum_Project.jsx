import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome, FaFolder } from "react-icons/fa";
import logo from "../../../assets/irc-logo-rb.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./forum_Project.css";

const Forum_Project = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpne3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpne4] = useState(false);
  const [isDropdownOpen5, setIsDropdownOpne5] = useState(false);
  const [isDropdownOpen6, setIsDropdownOpen6] = useState(false);
  const [isDropdownOpen7, setIsDropdownOpen7] = useState(false);

  // State to store user information
  const [userInfo, setUserInformation] = useState(null);

  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamLeader, setNewTeamLeader] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [expandedTeamIndex, setExpandedTeamIndex] = useState(null);
  const [resumeFr, setResumeFr] = useState("");
  const [resumeEn, setResumeEn] = useState("");
  const [taskFormVisible, setTaskFormVisible] = useState({});
  const [tasks, setTasks] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskMember, setTaskMember] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const [intro, setIntro] = useState("");
  const [objectives, setObjectives] = useState("");
  const [methodology, setMethodology] = useState("");
  const [results, setResults] = useState("");
  const [ethics, setEthics] = useState("");

  const [isFormVisiblePlaning, setIsFormVisiblePlaning] = useState(false);
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [planings, setPlanings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [formData, setFormData] = useState({
    projectTitle: "",
    startDate: "",
    endDate: "",
    applicationField: "",
    domain: "",
    subDomain: "",
    totalAmount: "",
    requestedAmount: "",
  });

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    setFormData({ ...formData, domain: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const biologyOptions = [
    "Fonctionnement normal",
    "Déclenchement du cancer : aberrations chromosomiques",
    "Déclenchement du cancer : oncogènes et gènes suppresseurs de tumeurs",
    "Évolution du cancer et métastase",
    "Ressources et infrastructures",
    "Biologie du cancer",
  ];
  const etiologieOptions = [
    "Facteurs exogenes lies a l'origine et a la cause",
    "Facteurs endogenes lies a l'orgine et a la cause",
    "Interactions entre les genes et/ou polymorphismes genetiques",
    "Ressousrces et infrastructures liees a l'etiologie",
  ];

  const preventionOption = [
    "Interventions visant a prevenir le cancer : comportements personnels qu",
    "Science de la nutrition et prevention du cancer",
    "chimioprevention",
    "Vaccins",
    "methodes de prevention complementaires et paralleles",
    "Ressoureces et infrasrtructures liees a la prevnetion",
  ];

  const traitementOption = [
    "RadioTheparapie",
    "Chirurgie",
    "Traitement systemique",
    "ChimioTherapie",
    "Hormonotherapie",
    "Therapeutique moleculaires ciblees",
    "Immunotherapie",
  ];

  const Autres_domaines_de_lutte_contre_le_cancerOption = [
    "Analyse des couts et prestation de soins de sante",
    "Sensibilisation et communication",
    "Soins en fin de vie",
    "Ethique et confidentialite dans le domaine de la recherche sur le cancer",
    "Approches complementaires et paralleles en matiere de soins",
    "Ressources et infrastructures liees a la lutte contre le cancer",
  ];

  const Modeles_ScientifiquesOption = [
    "Elaboration et caracterisation de modeles",
    "Application de modeles",
    "Ressources et infrastructures liees aux modeles scientifiques",
  ];

  const handleSavePlaning = () => {
    const newPlaning = {
      activity,
      description,
      team,
      startDate,
      endDate,
      totalDays,
    };
    if (editIndex !== null) {
      const updatedPlanings = [...planings];
      updatedPlanings[editIndex] = newPlaning;
      setPlanings(updatedPlanings);
      setEditIndex(null);
    } else {
      setPlanings([...planings, newPlaning]);
    }
    setActivity("");
    setDescription("");
    setTeam("");
    setStartDate("");
    setEndDate("");
    setTotalDays("");
    setIsFormVisiblePlaning(false);
  };

  const handleEdit = (index) => {
    const planing = planings[index];
    setActivity(planing.activity);
    setDescription(planing.description);
    setTeam(planing.team);
    setStartDate(planing.startDate);
    setEndDate(planing.endDate);
    setTotalDays(planing.totalDays);
    setIsFormVisiblePlaning(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPlanings = planings.filter((_, i) => i !== index);
    setPlanings(updatedPlanings);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including the start date
      setTotalDays(diffDays);
    } else {
      setTotalDays("");
    }
  }, [startDate, endDate]);
  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
    if (isDropdownOpen2) {
      setIsDropdownOpen2(false);
    }
  };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    if (isDropdownOpen1) {
      setIsDropdownOpen1(false);
    }
  };

  const toggleDropdown3 = () => {
    setIsDropdownOpne3(!isDropdownOpen3);
    if (isDropdownOpen2) {
      setIsDropdownOpen2(false);
    } else if (isDropdownOpen1) {
      setIsDropdownOpen1(false);
    }
  };

  const toggleDropdown4 = () => {
    setIsDropdownOpne4(!isDropdownOpen4);
  };

  const toggleDropdown5 = () => {
    setIsDropdownOpne5(!isDropdownOpen5);
  };

  const toggleDropdown6 = () => {
    setIsDropdownOpen6(!isDropdownOpen6);
  };

  const toggleDropdown7 = () => {
    setIsDropdownOpen7(!isDropdownOpen7);
  };

  const closeDropdown1 = () => {
    setIsDropdownOpen1(false);
  };

  const closeDropdown2 = () => {
    setIsDropdownOpen2(false);
  };

  const closeDropdown3 = () => {
    setIsDropdownOpne3(false);
  };

  const closeDropdown4 = () => {
    setIsDropdownOpne4(false);
  };

  const closeDropdown5 = () => {
    setIsDropdownOpne5(false);
  };

  const closeDropdown6 = () => {
    setIsDropdownOpen6(false);
  };

  const closeDropdown7 = () => {
    setIsDropdownOpen7(false);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSave = () => {
    // Directly access state variables instead of `formData`
    const dataToSend = {
      projectTitle: formData.projectTitle,
      startDate: formData.startDate,
      endDate: formData.endDate,
      applicationField: formData.applicationField,
      domain: formData.domain,
      subDomain: formData.subDomain,
      totalAmount: formData.totalAmount,
      requestedAmount: formData.requestedAmount,

      // Resume information
      resume: {
        francais: resumeFr,
        anglais: resumeEn,
      },

      // Mini project details
      miniProject: {
        introduction: intro,
        objectives: objectives,
        methodology: methodology,
        results: results,
        ethics: ethics,
      },
    };

    // Send the data using axios
    axios
      .post("http://localhost/irc/projets.php", dataToSend)
      .then((response) => {
        console.log("Data saved successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the data!", error);
      });
  };
  const email = Cookies.get("email");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost/irc/allinfouser.php",
          { email }
        );

        let userInformation = response.data.userInformation;

        // Check if it's a string and attempt to parse it
        if (typeof userInformation === "string") {
          try {
            userInformation = JSON.parse(userInformation);
            console.log("Parsed user information:", userInformation);
          } catch (parseError) {
            console.error("Error parsing user information:", parseError);
            return; // Exit if parsing fails
          }
        }

        setUserInformation(userInformation);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (email) {
      fetchUserInfo();
    }
  }, [email]);
  console.log("userInfo:", userInfo);

  const handleAddTeam = () => {
    setTeams([
      ...teams,
      { name: newTeamName, leader: newTeamLeader, members: [] },
    ]);
    setNewTeamName("");
    setNewTeamLeader("");
    setIsFormVisible(false);
  };

  const handleAddTeamMember = (index) => {
    const memberName = prompt("Enter member's name:");
    const memberRole = prompt("Enter member's role:");
    if (memberName && memberRole) {
      const updatedTeams = teams.map((team, i) =>
        i === index
          ? {
              ...team,
              members: [
                ...team.members,
                { name: memberName, role: memberRole },
              ],
            }
          : team
      );
      setTeams(updatedTeams);
    }
  };

  const handleDeleteTeamMember = (teamIndex, memberIndex) => {
    const updatedTeams = teams.map((team, i) =>
      i === teamIndex
        ? { ...team, members: team.members.filter((_, j) => j !== memberIndex) }
        : team
    );
    setTeams(updatedTeams);
  };

  const getTrueDomainsOfInterest = () => {
    if (!userInfo) {
      return "User information not loaded";
    }

    let domainesDinteret = userInfo.domaine_dinteret;

    // Parse `domaine_dinteret` if it's a string
    if (typeof domainesDinteret === "string") {
      try {
        domainesDinteret = JSON.parse(domainesDinteret);
        console.log("Parsed domainesDinteret:", domainesDinteret);
      } catch (parseError) {
        console.error("Error parsing `domaine_dinteret`:", parseError);
        return "Error parsing Domaines d'intérêt"; // Return a fallback message
      }
    }

    if (typeof domainesDinteret !== "object") {
      console.error(
        "Expected `domaine_dinteret` to be an object, but got:",
        typeof domainesDinteret
      );
      return "Invalid data structure for Domaines d'intérêt";
    }

    const trueChoices = Object.entries(domainesDinteret)
      .filter(([key, value]) => value === true) // Filter only `true` values
      .map(([key]) => key) // Get the keys
      .join(", "); // Join them into a comma-separated list

    return trueChoices || "No true domain found";
  };

  const toggleTeamMembers = (index) => {
    setExpandedTeamIndex(expandedTeamIndex === index ? null : index);
  };

  const handleAddTask = (index) => {
    setTaskFormVisible({
      ...taskFormVisible,
      [index]: !taskFormVisible[index],
    });
  };

  const handleSaveTask = (planingIndex, task) => {
    const newTasks = { ...tasks };
    if (!newTasks[planingIndex]) newTasks[planingIndex] = [];
    newTasks[planingIndex].push(task);
    setTasks(newTasks);
    setTaskFormVisible({ ...taskFormVisible, [planingIndex]: false });
  };

  const handleEditTask = (planingIndex, taskIndex) => {
    // Implement edit task functionality here
  };

  const handleDeleteTask = (planingIndex, taskIndex) => {
    const newTasks = { ...tasks };
    newTasks[planingIndex].splice(taskIndex, 1);
    setTasks(newTasks);
  };

  const calculateTotalDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  return (
    <div>
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="sidebar-item" onClick={handleToggleSidebar}>
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </div>
        </Link>
        <Link to="/chercheur-projet" style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <FaFolder style={{ marginRight: "8px" }} />
            Competition
          </div>
        </Link>
      </div>

      <div className="dropdown-container">
        <div className="header-container">
          <div className="record-id">
            ID: {userInfo ? userInfo.email : "Loading..."}
          </div>
          <div className="save-button">
            <button onClick={handleSave}>Enregistrer</button>
          </div>
        </div>

        {/* Coordonnateur principal Dropdown */}

        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown1}>
            <div className="dropdown-title">Coordonnateur principal</div>
            <div class="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen1 ? "show" : ""}`}>
            {userInfo ? (
              <>
                <p>
                  {" "}
                  <strong> Appel à Compétition</strong>
                </p>
                <p className="item">
                  <strong>Nom</strong>
                </p>
                <input
                  type="text"
                  placeholder="Nom"
                  value={userInfo.nom}
                  readOnly
                />
                <p className="item">
                  <strong>Prénom</strong>
                </p>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={userInfo.prenom}
                  readOnly
                />
                <p className="item">
                  <strong>Date de naissance</strong>
                </p>
                <input
                  type="text"
                  placeholder="Date de naissance"
                  value={userInfo.datenaissance}
                  readOnly
                />
                <p className="item">
                  <strong>E-mail</strong>
                </p>
                <input
                  type="text"
                  placeholder="Email"
                  readOnly
                  value={userInfo.email}
                />
                <p className="item">
                  <strong>Téléphone</strong>
                </p>
                <input
                  type="text"
                  placeholder="Téléphone"
                  value={userInfo.telephone}
                  readOnly
                />
                <p className="item">
                  <strong>Spécialité</strong>
                </p>
                <input
                  type="text"
                  placeholder="Spécialité"
                  value={userInfo.specialite}
                  readOnly
                />
                <p className="item">
                  <strong>Type d'organisme</strong>
                </p>
                <input
                  type="text"
                  placeholder="Type d'organisme"
                  value={userInfo.type_organisme}
                  readOnly
                />
                <p className="item">
                  <strong>Domaine d'intérêt</strong>
                </p>
                <input
                  type="text"
                  placeholder="Domaine d'intérêt"
                  value={getTrueDomainsOfInterest()}
                  readOnly
                />
                <p className="item">
                  <strong>Spécialité de formation</strong>
                </p>
                <input
                  type="text"
                  placeholder="Spécialité de formation"
                  readOnly
                  value={userInfo.specialite_formation}
                />
                <p className="item">
                  <strong>Domaine de maîtrise</strong>
                </p>
                <input
                  type="text"
                  placeholder="Domaine de maîtrise"
                  readOnly
                  value={userInfo.domaine_maitrise}
                />
                <p className="item">
                  <strong>Statut</strong>
                </p>
                <input
                  type="text"
                  placeholder="Statut"
                  value={userInfo.statut}
                  readOnly
                />
                <p className="item">
                  <strong>Organisme sélectionné</strong>
                </p>
                <input
                  type="text"
                  placeholder="Organisme sélectionné"
                  value={userInfo.selected_organisme}
                  readOnly
                />
                <div className="dropdown-buttons">
                  <button onClick={handleSave}>Enregistrer</button>
                  <button onClick={closeDropdown1}>Annuler</button>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        {/* Secondaire Dropdown */}
        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown2}>
            <div className="dropdown-title">Informations générales</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen2 ? "show" : ""}`}>
            {userInfo ? (
              <>
                <p className="item">
                  <strong>Titre du projet</strong>
                </p>
                <input
                  type="text"
                  placeholder="Titre du projet"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                />
                <p className="item">
                  <strong>Date prévisionnelle du début du projet</strong>
                </p>
                <input
                  type="date"
                  placeholder="Date prévisionnelle du début du projet"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <p className="item">
                  <strong>Date de fin du projet</strong>
                </p>
                <input
                  type="date"
                  placeholder="Date de fin du projet"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                <p className="item">
                  <strong>Champs d’application </strong>
                </p>
                <select
                  name="applicationField"
                  className="select-feild"
                  id=""
                  value={formData.applicationField}
                  onChange={handleChange}
                >
                  <option value="">Choisire Votre Champs D’application</option>
                  <option>Epidemiologie, Sante Publique</option>
                  <option>Managment / Offre de soins</option>
                  <option>
                    Base de donnees/ Techniquess d'information et de
                    communication
                  </option>
                  <option>Biologie moleculaire / Recherche clinique</option>
                  <option>Recherche clinique</option>
                  <option>Recherche Translationnelle</option>
                  <option>Socio-anthropologie</option>
                  <option>Communication / Education sanitaire</option>
                </select>
                <p className="item">
                  <strong>Domaines et sous-domaines de recherche</strong>
                </p>
                <select
                  name="domain"
                  className="select-feild"
                  onChange={handleDomainChange}
                  value={formData.domain}
                >
                  <option value="">Choisir Votre Domaine de Recherche</option>
                  <option value="Biologie">Biologie</option>
                  <option value="Etiologie">Étiologie</option>
                  <option value="Prevention">Prévention</option>
                  <option value="Traitement">Traitement</option>
                  <option value="Autres domaines de lutte contre le cancer">
                    Autres domaines de lutte contre le cancer
                  </option>
                  <option value="Modeles Scientifique">
                    Modèles Scientifiques
                  </option>
                </select>
                {selectedDomain === "Biologie" && (
                  <select
                    name="subDomain"
                    className="select-feild"
                    value={formData.subDomain}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une option</option>
                    {biologyOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {selectedDomain === "Etiologie" && (
                  <select
                    name="subDomain"
                    className="select-feild"
                    value={formData.subDomain}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une option</option>
                    {etiologieOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {selectedDomain === "Prevention" && (
                  <select
                    name="subDomain"
                    className="select-feild"
                    value={formData.subDomain}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une option</option>
                    {preventionOption.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {selectedDomain === "Traitement" && (
                  <select
                    name="subDomain"
                    className="select-feild"
                    value={formData.subDomain}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une option</option>
                    {traitementOption.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
                {selectedDomain ===
                  "Autres domaines de lutte contre le cancer" && (
                  <select
                    name="subDomain"
                    className="select-feild"
                    value={formData.subDomain}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une option</option>
                    {Autres_domaines_de_lutte_contre_le_cancerOption.map(
                      (option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      )
                    )}
                  </select>
                )}
                {selectedDomain === "Modeles Scientifique" && (
                  <select
                    name="subDomain"
                    className="select-feild"
                    value={formData.subDomain}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner une option</option>
                    {Modeles_ScientifiquesOption.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                <p className="item">
                  <strong>Montant global du projet (MAD)</strong>
                </p>
                <input
                  type="number"
                  placeholder="Montant global du Projet"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                />
                <p className="item">
                  <strong>
                    Montant de la subvention demandé à l'IRC (MAD)
                  </strong>
                </p>
                <input
                  type="number"
                  placeholder="Monatant de subvention"
                  name="requestedAmount"
                  value={formData.requestedAmount}
                  onChange={handleChange}
                />
                <div className="dropdown-buttons">
                  <button onClick={handleSave}>Enregistrer</button>
                  <button onClick={closeDropdown2}>Annuler</button>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown3}>
            <div className="dropdown-title">Résumé</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen3 ? "show" : ""}`}>
            <>
              <h1 style={{ color: "black" }}>Résumé</h1>
              <p>
                <strong>
                  Décrire : <br />
                  -L'état de l’art du projet,
                  <br /> -Les Objectifs,
                  <br />
                  -La méthodologie, <br /> -Les Résultats.
                </strong>
              </p>
              <p>
                N.B : Si le projet est sélectionné et financé, son résumé
                pourrait faire l'objet de publication sur le site internet de
                l'IRC.
              </p>
              <div className="container-resume">
                <p>
                  Résumé en <strong> francais </strong> décrivant : L'état de
                  l’art du projet, Les objectifs, La méthodologie, Les résultats
                  escomptés
                </p>
                <textarea
                  value={resumeFr}
                  onChange={(e) => setResumeFr(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume">
                <p>
                  Résumé en <strong> Anglais </strong> décrivant : L'état de
                  l’art du projet, Les objectifs, La méthodologie, Les résultats
                  escomptés
                </p>
                <textarea
                  value={resumeEn}
                  onChange={(e) => setResumeEn(e.target.value)}
                ></textarea>
              </div>
              <div className="dropdown-buttons">
                <button onClick={handleSave}>Enregistrer</button>
                <button onClick={closeDropdown3}>Annuler</button>
              </div>
            </>
          </div>
        </div>
        <div className="dropdown">
          {" "}
          <div className="dropdown-title-wrapper" onClick={toggleDropdown4}>
            <div className="dropdown-title">Description du mini-projet</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen4 ? "show" : ""}`}>
            <>
              <h1 style={{ color: "black" }}>Description du mini-projet</h1>
              <div className="container-resume-mini">
                <p>Introduction*</p>
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p>Objectif général et objectifs spécifiques du projet *</p>
                <textarea
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p>Méthodologie proposée*</p>
                <textarea
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p>Résultats attendus et impacts du mini-projet*</p>
                <textarea
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p>Considérations éthiques*</p>
                <textarea
                  value={ethics}
                  onChange={(e) => setEthics(e.target.value)}
                ></textarea>
              </div>
              <div className="dropdown-buttons">
                <button onClick={handleSave}>Enregistrer</button>
                <button onClick={closeDropdown4}>Annuler</button>
              </div>
            </>
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown5}>
            <div className="dropdown-title">Créer votre équipe</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen5 ? "show" : ""}`}>
            <>
              <div className="equipe-section">
                <button onClick={() => setIsFormVisible(!isFormVisible)}>
                  {isFormVisible ? "X" : "Ajouter Équipe"}
                </button>

                {isFormVisible && (
                  <div className="form-container">
                    <div>
                      <p className="item">
                        <strong>Nom d'équipe:</strong>
                      </p>
                      <input
                        type="text"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        placeholder="Nom d'équipe"
                      />
                    </div>
                    <div>
                      <p className="item">
                        <strong>Chef d'équipe:</strong>
                      </p>
                      <input
                        type="text"
                        value={newTeamLeader}
                        onChange={(e) => setNewTeamLeader(e.target.value)}
                        placeholder="Chef d'équipe"
                      />
                    </div>
                    <button onClick={handleAddTeam}>Ajouter</button>
                  </div>
                )}

                <div>
                  <p>
                    <strong>Équipes créées:</strong>
                  </p>
                  {teams.length > 0 ? (
                    <table>
                      <thead>
                        <tr>
                          <th>Nom d'équipe</th>
                          <th>Chef d'équipe</th>
                          <th>Action</th>
                          <th>Membres</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teams.map((team, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>{team.name}</td>
                              <td>{team.leader}</td>
                              <td>
                                <button
                                  onClick={() => toggleTeamMembers(index)}
                                >
                                  {expandedTeamIndex === index
                                    ? "Cacher Membres"
                                    : "Voir Membres"}
                                </button>
                                <button
                                  onClick={() => handleAddTeamMember(index)}
                                >
                                  Ajouter Membre
                                </button>
                              </td>
                              <td>
                                {expandedTeamIndex === index && (
                                  <div className="team-members-dropdown">
                                    {team.members.length > 0 ? (
                                      <ul>
                                        {team.members.map((member, i) => (
                                          <li key={i}>
                                            {member.name} ({member.role})
                                            <button
                                              onClick={() =>
                                                handleDeleteTeamMember(index, i)
                                              }
                                            >
                                              Supprimer
                                            </button>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <p>Aucun membre ajouté.</p>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="no-teams">Aucune équipe ajoutée.</p>
                  )}
                </div>
              </div>
              <div className="dropdown-buttons">
                <button onClick={handleSave}>Enregistrer</button>
                <button onClick={closeDropdown5}>Annuler</button>
              </div>
            </>
          </div>
        </div>

        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown6}>
            <div className="dropdown-title">Planing</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen6 ? "show" : ""}`}>
            <>
              <p>Ajouter un Planing</p>
              <button
                onClick={() => setIsFormVisiblePlaning(!isFormVisiblePlaning)}
              >
                {isFormVisiblePlaning ? "Annuler" : "Ajouter un Planing"}
              </button>

              {isFormVisiblePlaning && (
                <div className="planing-form-container">
                  <div className="planing-form-group">
                    <p className="item">
                      <strong>Activité:</strong>
                    </p>
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      placeholder="Activité"
                    />
                  </div>
                  <div className="planing-form-group">
                    <p className="item">
                      <strong>Description:</strong>
                    </p>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <div className="planing-form-group">
                    <p className="item">
                      <strong>Équipe:</strong>
                    </p>
                    <input
                      type="text"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="Équipe"
                    />
                  </div>
                  <div className="planing-form-group-inline">
                    <div className="planing-form-group">
                      <p className="item">
                        <strong>Date début:</strong>
                      </p>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="planing-form-group">
                      <p className="item">
                        <strong>Date fin:</strong>
                      </p>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div className="planing-form-group">
                      <p className="item">
                        <strong>Total des jours:</strong>
                      </p>
                      <input
                        type="number"
                        value={totalDays}
                        readOnly
                        placeholder="Total des jours"
                      />
                    </div>
                  </div>
                </div>
              )}

              {planings.length > 0 && (
                <div>
                  <p>
                    <strong>Planings créés:</strong>
                  </p>
                  <table className="planing-table">
                    <thead>
                      <tr>
                        <th>Activité</th>
                        <th>Description</th>
                        <th>Équipe</th>
                        <th>Date début</th>
                        <th>Date fin</th>
                        <th>Total des jours</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planings.map((planing, planingIndex) => (
                        <tr key={planingIndex}>
                          <td>{planing.activity}</td>
                          <td>{planing.description}</td>
                          <td>{planing.team}</td>
                          <td>{planing.startDate}</td>
                          <td>{planing.endDate}</td>
                          <td>{planing.totalDays}</td>
                          <td className="planing-dropdown-buttons">
                            <button onClick={() => handleEdit(planingIndex)}>
                              Modifier
                            </button>
                            <button onClick={() => handleDelete(planingIndex)}>
                              Supprimer
                            </button>
                            <button onClick={() => handleAddTask(planingIndex)}>
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {Object.keys(taskFormVisible).map(
                    (index) =>
                      taskFormVisible[index] && (
                        <div key={index} className="task-form-container">
                          <div className="task-form-group">
                            <p className="item">
                              <strong>Nom Tâche:</strong>
                            </p>
                            <input
                              type="text"
                              placeholder="Nom Tâche"
                              onChange={(e) => setTaskName(e.target.value)}
                            />
                          </div>
                          <div className="task-form-group">
                            <p className="item">
                              <strong>Description:</strong>
                            </p>
                            <input
                              type="text"
                              placeholder="Description"
                              onChange={(e) =>
                                setTaskDescription(e.target.value)
                              }
                            />
                          </div>
                          <div className="task-form-group">
                            <p className="item">
                              <strong>Membre de l'équipe:</strong>
                            </p>
                            <input
                              type="text"
                              placeholder="Membre de l'équipe"
                              onChange={(e) => setTaskMember(e.target.value)}
                            />
                          </div>
                          <div className="task-form-group">
                            <p className="item">
                              <strong>Date début:</strong>
                            </p>
                            <input
                              type="date"
                              onChange={(e) => setTaskStartDate(e.target.value)}
                            />
                          </div>
                          <div className="task-form-group">
                            <p className="item">
                              <strong>Date fin:</strong>
                            </p>
                            <input
                              type="date"
                              onChange={(e) => setTaskEndDate(e.target.value)}
                            />
                          </div>
                          <div className="task-form-group">
                            <p className="item">
                              <strong>Total des jours:</strong>
                            </p>
                            <input
                              type="number"
                              readOnly
                              placeholder="Total des jours"
                              value={calculateTotalDays(
                                taskStartDate,
                                taskEndDate
                              )}
                            />
                          </div>
                          <div className="task-form-buttons">
                            <button
                              onClick={() =>
                                handleSaveTask(index, {
                                  name: taskName,
                                  description: taskDescription,
                                  member: taskMember,
                                  startDate: taskStartDate,
                                  endDate: taskEndDate,
                                  totalDays: calculateTotalDays(
                                    taskStartDate,
                                    taskEndDate
                                  ),
                                })
                              }
                            >
                              Enregistrer
                            </button>
                            <button
                              onClick={() =>
                                setTaskFormVisible({
                                  ...taskFormVisible,
                                  [index]: false,
                                })
                              }
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      )
                  )}

                  {Object.keys(tasks).map((planingIndex) => (
                    <div key={planingIndex}>
                      <p>
                        <strong>
                          Tâches pour {planings[planingIndex].activity}:
                        </strong>
                      </p>
                      <table className="task-table">
                        <thead style={{ color: "black" }}>
                          <tr>
                            <th>Nom Tâche</th>
                            <th>Description</th>
                            <th>Membre de l'équipe</th>
                            <th>Date début</th>
                            <th>Date fin</th>
                            <th>Total des jours</th>
                            <th>Option</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks[planingIndex].map((task, taskIndex) => (
                            <tr key={taskIndex}>
                              <td>{task.name}</td>
                              <td>{task.description}</td>
                              <td>{task.member}</td>
                              <td>{task.startDate}</td>
                              <td>{task.endDate}</td>
                              <td>{task.totalDays}</td>
                              <td className="task-dropdown-buttons">
                                <button
                                  onClick={() =>
                                    handleEditTask(planingIndex, taskIndex)
                                  }
                                >
                                  Modifier
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteTask(planingIndex, taskIndex)
                                  }
                                >
                                  Supprimer
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              )}

              <div className="dropdown-buttons">
                {isFormVisiblePlaning && (
                  <button onClick={handleSavePlaning}>Enregistrer</button>
                )}
                <button onClick={closeDropdown6}>Annuler</button>
              </div>
            </>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown7}>
            <div className="dropdown-title">Budget</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen7 ? "show" : ""}`}>
            {" "}
            <p>
              Décrivez les dépenses pour chacune des catégories budgétaires
              pertinentes.
            </p>
            <p className="item">
              <strong>Type de section</strong>
            </p>
            <select className="select-feild">
              <option value="">choisire votre Type de section</option>
              <option value="">Depenses de fonctionnement</option>
            </select>
            <p className="item">
              <strong>Groupement Budget</strong>
            </p>
            <select className="select-feild">
              <option value="">choisir votre Groupement Budget</option>
              <option value="">Depenses de fonctionnement</option>
            </select>
            <p className="item">
              <strong>Catégorie</strong>
            </p>
            <select className="select-feild">
              <option value="">choisir la Catégorie</option>
              <option value="">Depenses de fonctionnement</option>
            </select>
            <div className="task-form-group">
              <p className="item">
                <strong>Description:</strong>
              </p>
              <input
                type="text"
                placeholder="Description"
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <p className="item">
              <strong>Montant de budegt</strong>
            </p>
            <input
              type="number"
              placeholder="Montant de budegt"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
            />
            <div className="dropdown-buttons">
              <button onClick={handleSave}>Enregistrer</button>
              <button onClick={closeDropdown7}>Annuler</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum_Project;
