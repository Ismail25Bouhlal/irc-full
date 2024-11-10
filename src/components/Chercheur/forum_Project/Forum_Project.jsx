import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome, FaFolder } from "react-icons/fa";
import logo from "../../../assets/irc-logo-rb.png";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import "./forum_Project.css";
import Modal from "react-modal";

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
  const [userInfo, setUserInformation] = useState("");

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedResearcherId, setSelectedResearcherId] = useState(null);
  const [newTeamLeader, setNewTeamLeader] = useState("");
  const [newTeamLeaderEmail, setNewTeamLeaderEmail] = useState("");
  const [teams, setTeams] = useState([]); // Initialize as an empty array
  const [expandedTeamIndex, setExpandedTeamIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeFr, setResumeFr] = useState("");
  const [resumeEn, setResumeEn] = useState("");
  const [taskFormVisible, setTaskFormVisible] = useState({});
  const [tasks, setTasks] = useState({});
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [taskMember, setTaskMember] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");

  const [intro, setIntro] = useState("");
  const [objectives, setObjectives] = useState("");
  const [methodology, setMethodology] = useState("");
  const [results, setResults] = useState("");
  const [ethics, setEthics] = useState("");
  const [competitionId, setCompetitionId] = useState("");
  const [competitionData, setCompetitionData] = useState(null);

  const [teamId, setTeamId] = useState(null);
  const [projectId, setProjectId] = useState(null);

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
  const [data, setData] = useState([]); // Store dropdown data
  const [filteredGroupements, setFilteredGroupements] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [idcompetition, setIdCompetition] = useState(null);
  const [researcherId, setResearcherId] = useState(null);

  const location = useLocation(); // Get current location to retrieve query params
  const budgetParametreId = location.state?.budgetParametreId || null;
  console.log("Received budgetParametreId:", budgetParametreId);

  // Extract competitionId from query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const competitionIdFromUrl = searchParams.get("competitionId");

    if (competitionIdFromUrl) {
      setIdCompetition(competitionIdFromUrl); // Set competitionId in state
    }
  }, [location]);

  useEffect(() => {
    fetch("http://localhost/irc/fetch_dropdown_data.php")
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log("Fetched Data:", fetchedData); // Check fetched data
        setData(fetchedData); // Store data in state
      })
      .catch((error) => console.error("Error fetching dropdown data:", error));
  }, []);

  useEffect(() => {
    if (budgetParametreId && data.length > 0) {
      filterDataByBudgetParametre(budgetParametreId, data);
    }
  }, [budgetParametreId, data]);

  const filterDataByBudgetParametre = (budgetParametreId, data) => {
    if (!budgetParametreId) {
      console.warn("No budgetParametreId provided!");
      return;
    }

    console.log("Filtering with budgetParametreId:", budgetParametreId);

    // Filter data based on the budgetParametreId
    const filteredData = data.filter(
      (item) =>
        parseInt(item.budget_parametre_id) === parseInt(budgetParametreId)
    );

    // Initialize unique collections for sections, groupements, and categories
    const uniqueSections = [];
    const uniqueGroupements = [];
    const uniqueCategories = [];

    const sectionMap = new Map();
    const groupementMap = new Map();

    filteredData.forEach((item) => {
      // Check and add unique sections
      if (!sectionMap.has(item.section_id)) {
        sectionMap.set(item.section_id, {
          section_id: item.section_id,
          section_appellation: item.section_appellation,
        });
        uniqueSections.push(sectionMap.get(item.section_id));
      }

      // Check and add unique groupements under each section
      if (!groupementMap.has(item.groupement_id)) {
        groupementMap.set(item.groupement_id, {
          groupement_id: item.groupement_id,
          groupement_appellation: item.groupement_appellation,
          groupement_section_id: item.groupement_section_id,
        });
        uniqueGroupements.push(groupementMap.get(item.groupement_id));
      }

      // Add all unique categories
      uniqueCategories.push({
        categorie_id: item.categorie_id,
        categorie_appellation: item.categorie_appellation,
        categorie_groupement_id: item.categorie_groupement_id,
      });
    });

    // Set filtered results to state or display
    setFilteredSections(uniqueSections);
    setFilteredGroupements(uniqueGroupements);
    setFilteredCategories(uniqueCategories);
  };

  // Log to check if competition ID is correctly retrieved
  useEffect(() => {
    if (idcompetition) {
      console.log("Competition ID:", idcompetition);
    }
  }, [idcompetition]);

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

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    setFormData({ ...formData, domain: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const saveProjectData = async () => {
    // Prepare the data structure to match what the backend expects
    const dataToSend = {
      projectTitle: formData.projectTitle,
      startDate: formData.startDate,
      endDate: formData.endDate,
      applicationField: formData.applicationField,
      domain: formData.domain,
      subDomain: formData.subDomain,
      totalAmount: formData.totalAmount,
      requestedAmount: formData.requestedAmount,
      resume: {
        francais: resumeFr,
        anglais: resumeEn,
      },
      miniProject: {
        introduction: intro,
        objectives: objectives,
        methodology: methodology,
        results: results,
        ethics: ethics,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost/irc/projets.php",
        dataToSend
      );
      console.log("Project data saved successfully:", response.data);
      alert("Project data saved successfully!");
    } catch (error) {
      console.error("Error saving project data:", error);
      alert("There was an error saving the project data!");
    }
  };

  const savePlanningData = async () => {
    const planningData = {
      nom_Planning: activity,
      Description_Planning: description,
      id_equipe: teamId,
      idprojet: projectId,
      debut_planning: startDate,
      fin_planning: endDate,
      nbr_jour_planning: totalDays,
    };

    try {
      const response = await axios.post(
        "http://localhost/irc/save_planning.php",
        planningData
      );
      console.log("Planning data saved successfully:", response.data);
      alert("Planning data saved successfully!");
    } catch (error) {
      console.error("Error saving planning data:", error);
      alert("There was an error saving the planning data!");
    }
  };

  // Handle changes in member details

  // Remove a member
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

  useEffect(() => {
    // Fetch competition data
    axios
      .get("http://localhost/irc/getCompititionInfo.php")
      .then((response) => {
        const competitions = response.data;
        if (competitions && competitions.length > 0) {
          // Assuming you want to use the first competition in the list
          const firstCompetition = competitions[0];
          setCompetitionId(firstCompetition.id);
          setCompetitionData(firstCompetition);
          setSelectedProjectId(firstCompetition.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching competition data:", error);
      });
  }, [competitionId]);
  console.log("compititionid:", competitionId);


  const getTrueDomainsOfInterest = () => {
    if (!userInfo) {
      return "User information not loaded";
    }

    let domainesDinteret = userInfo.domaine_dinteret;

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
            <button>Enregistrer</button>
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
                  <h1 style={{ color: "black" }}>Appel A Compitition</h1>
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
                <h1 style={{ color: "black" }}>Informations générales</h1>
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
                  <button onClick={saveProjectData}>Enregistrer</button>
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
              <p className="text-left">
                <strong>
                  Décrire : <br />
                  -L'état de l'art du projet,
                  <br /> -Les Objectifs,
                  <br />
                  -La méthodologie, <br /> -Les Résultats.
                </strong>
              </p>
              <p className="text-left">
                N.B : Si le projet est sélectionné et financé, son résumé
                pourrait faire l'objet de publication sur le site internet de
                l'IRC.
              </p>
              <div className="container-resume">
                <p className="text-left">
                  Résumé en <strong> francais </strong> décrivant : L'état de
                  l'art du projet, Les objectifs, La méthodologie, Les résultats
                  escomptés
                </p>
                <textarea
                  value={resumeFr}
                  onChange={(e) => setResumeFr(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume">
                <p className="text-left">
                  Résumé en <strong> Anglais </strong> décrivant : L'état de
                  l'art du projet, Les objectifs, La méthodologie, Les résultats
                  escomptés
                </p>
                <textarea
                  value={resumeEn}
                  onChange={(e) => setResumeEn(e.target.value)}
                ></textarea>
              </div>
              <div className="dropdown-buttons">
                <button onClick={saveProjectData}>Enregistrer</button>
                <button onClick={closeDropdown3}>Annuler</button>
              </div>
            </>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown-title-wrapper" onClick={toggleDropdown4}>
            <div className="dropdown-title">Description du mini-projet</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isDropdownOpen4 ? "show" : ""}`}>
            <>
              <h1 style={{ color: "black" }}>Description du mini-projet</h1>
              <div className="container-resume-mini">
                <p className="text-left">Introduction*</p>
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p className="text-left">
                  Objectif général et objectifs spécifiques du projet *
                </p>
                <textarea
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p className="text-left">Méthodologie proposée*</p>
                <textarea
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p className="text-left">
                  Résultats attendus et impacts du mini-projet*
                </p>
                <textarea
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                ></textarea>
              </div>
              <div className="container-resume-mini">
                <p className="text-left">Considérations éthiques*</p>
                <textarea
                  value={ethics}
                  onChange={(e) => setEthics(e.target.value)}
                ></textarea>
              </div>
              <div className="dropdown-buttons">
                <button onClick={saveProjectData}>Enregistrer</button>
                <button onClick={closeDropdown4}>Annuler</button>
              </div>
            </>
          </div>
        </div>
        <div className="dropdown">
          <div
            className="dropdown-title-wrapper"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            <div className="dropdown-title">Créer votre équipe</div>
            <div className="dropdown-flesh">&#x25B6;</div>
          </div>
          <div className={`dropdown-content ${isFormVisible ? "show" : ""}`}>
            <>
              <h1 style={{ color: "black" }}>Equipe</h1>
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
                        value={userInfo.prenom}
                        placeholder="Chef d'équipe"
                        readOnly
                      />
                    </div>
                    <div>
                      <p className="item">
                        <strong>Email de chef d'équipe:</strong>
                      </p>
                      <input
                        type="email"
                        value={userInfo.email}
                        placeholder="Email de chef d'équipe"
                        readOnly
                      />
                    </div>
                    <button>Ajouter Membre</button>
                  </div>
                )}

                <div>
                  <p>
                    <strong>Membres de l'équipe:</strong>
                  </p>
                  {members.map((member, index) => (
                    <div key={index} className="member-form">
                      <div>
                        <p>Nom membre:</p>
                        <input
                          type="text"
                          value={member.nom}
                          placeholder="Nom membre"
                        />
                      </div>
                      <div>
                        <p>Prénom membre:</p>
                        <input
                          type="text"
                          value={member.prenom}
                          placeholder="Prénom membre"
                        />
                      </div>
                      <button>
                        Retirer
                      </button>
                    </div>
                  ))}
                </div>

                {/* Display Data in Table */}
                <h3>Équipe Détails</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Nom d'équipe</th>
                      <th>Chef d'équipe</th>
                      <th>Email du chef</th>
                      <th>Membres</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{newTeamName}</td>
                      <td>{userInfo.prenom}</td>
                      <td>{userInfo.email}</td>
                      <td>
                        <ul>
                          {members.map((member, index) => (
                            <li key={index}>
                              {member.nom} {member.prenom}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="dropdown-buttons">
                  <button>Enregistrer</button>
                  <button onClick={() => setIsFormVisible(false)}>
                    Annuler
                  </button>
                </div>
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
              <h1 style={{ color: "black" }}>Planing</h1>
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
            <h1 style={{ color: "black" }}>Budget</h1>
            <p className="item">
              <strong>Type de section</strong>
            </p>
            <select className="select-feild">
              <option value="">Choisir votre Type de section</option>
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                  <option key={section.section_id} value={section.section_id}>
                    {section.section_appellation}
                  </option>
                ))
              ) : (
                <option disabled>Aucune section disponible</option>
              )}
            </select>

            <p className="item">
              <strong>Groupement Budget</strong>
            </p>
            <select
              className="select-feild"
              disabled={!filteredGroupements.length}
            >
              <option value="">Choisir votre Groupement Budget</option>
              {filteredGroupements.map((groupement) => (
                <option
                  key={groupement.groupement_id}
                  value={groupement.groupement_id}
                >
                  {groupement.groupement_appellation}
                </option>
              ))}
            </select>

            <p className="item">
              <strong>Catégorie</strong>
            </p>
            <select
              className="select-feild"
              disabled={!filteredCategories.length}
            >
              <option value="">Choisir la Catégorie</option>
              {filteredCategories.map((categorie) => (
                <option
                  key={categorie.categorie_id}
                  value={categorie.categorie_id}
                >
                  {categorie.categorie_appellation}
                </option>
              ))}
            </select>

            <p className="item">
              <strong>Description</strong>
            </p>
            <input type="text" placeholder="Description" />
            <p className="item">
              <strong>Montant Du Budget</strong>
            </p>
            <input type="Number" placeholder="Montant Du Budget" />
            <div className="dropdown-buttons">
              <button onClick={handleSavePlaning}>Enregistrer</button>
              <button onClick={closeDropdown7}>Annuler</button>
            </div>
          </div>
        </div>
        {/* Modal for displaying team members */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Team Members"
        >
          <button
            className="close-button"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
          <h4>Membres de l'équipe</h4>
          {expandedTeamIndex !== null &&
          teams[expandedTeamIndex].members.length > 0 ? (
            <ul className="team-members-list">
              {teams[expandedTeamIndex].members.map((member, i) => (
                <li key={i} className="team-member-item">
                  <span>
                    {member.name} ({member.role})
                  </span>
                  <button
                    className="delete-member-button"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun membre ajouté.</p>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Forum_Project;
