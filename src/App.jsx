import React, { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom"; // Remove BrowserRouter and useHistory
import Login from "./auth/login.jsx";
import Auth from "./auth/Auth.jsx";
import AdminHome from "./components/Admin/home.jsx";
import AdminAbout from "./components/Admin/about/About.jsx";
import AdminProjet from "./components/Admin/projet/Projet.jsx";
import ChercheurHome from "./components/Chercheur/home.jsx";
import ChercheurAbout from "./components/Chercheur/about/About.jsx";
import ChercheurProjet from "./components/Chercheur/projet/Projet.jsx";
import Compte from "./components/Admin/compte/compte.jsx";
import Comptechercheur from "./components/Chercheur/compte/compte.jsx";
import AjouterUnecomp from "./components/Admin/projet/AjouterUneComp.jsx";
import Modification from "./components/Admin/projet/Modification.jsx";
import Forum_projectcherecheur from "./components/Chercheur/forum_Project/Forum_Project.jsx";
import Users from "./components/Admin/users/Users.jsx";
import Comite from "./components/Admin/comite/Comite.jsx";
import Parametre from "./components/Admin/parametre/parametre.jsx";
import Utilistateurs from "./components/Admin/users/Users.jsx";
import UserEdit from "./components/Admin/userEdit/userEdit.jsx";
import Evaluteur from "./components/Admin/evaluteur/evaluteur.jsx";
import AjouterUnBudget from "./components/Admin/parametre/AjouterUnBudget.jsx";
import HomeEvaluateur from "./components/Evaluateur/Home.jsx";
import ProfileSelection from "./components/profileselect/ProfileSelection.jsx";
import ModifierLeBudget from "./components/Admin/parametre/ModifierLeBudget.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLogin = (role) => {
    console.log("Logged in as:", role);
    setIsLoggedIn(true);
    setRole(role.toLowerCase());
    if (
      role.toLowerCase() === "chercheur" ||
      role.toLowerCase() === "evaluateur"
    ) {
      navigate("/select-profile"); // Redirect to profile selection page
    }
  };

  const handleProfileSelect = (profile) => {
    console.log("Profile selected:", profile);
    setRole(profile.toLowerCase());
    navigate("/home"); // Correctly use navigate to redirect
  };

  return (
    <Routes>
      <Route exact path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Auth />} />
      <Route
        path="/select-profile"
        element={<ProfileSelection onProfileSelect={handleProfileSelect} />}
      />
      {role === "administrateur" && (
        <>
          <Route path="/home/*" element={<AdminHome />} />
          <Route path="/admin-projet" element={<AdminProjet />} />
          <Route path="/admin-about" element={<AdminAbout />} />
          <Route path="/Mon-compte" element={<Compte />} />
          <Route path="/AjouteruneComp" element={<AjouterUnecomp />} />
          <Route path="/ModifierComp" element={<Modification />} />
          <Route path="/ForumProjet" element={<forum_project />} />
          <Route path="/Utilisateurs" element={<Users />} />
          <Route path="/comite" element={<Comite />} />
          <Route path="/parametre" element={<Parametre />} />
          <Route path="/Utislisatuers" element={<Utilistateurs />} />
          <Route path="/UserEdit" element={<UserEdit />} />
          <Route path="/Evaluateur" element={<Evaluteur />} />
          <Route path="/AjouterUnBudget" element={<AjouterUnBudget />} />
          <Route path="/ModifierLeBudget" element={<ModifierLeBudget/>} />
        </>
      )}
      {role === "chercheur" && (
        <>
          <Route path="/home" element={<ChercheurHome />} />
          <Route path="/chercheur-projet" element={<ChercheurProjet />} />
          <Route path="/chercheur-about" element={<ChercheurAbout />} />
          <Route path="/Mon-compte" element={<Comptechercheur />} />
          <Route
            path="/Forum_ProjectChercheur"
            element={<Forum_projectcherecheur />}
          />
        </>
      )}
      {role === "evaluateur" && (
        <>
          <Route path="/home" element={<HomeEvaluateur />} />
        </>
      )}
    </Routes>
  );
};

export default App;
