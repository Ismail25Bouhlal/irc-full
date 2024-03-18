import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"; // Remove BrowserRouter and useHistory
import Login from "./auth/login.jsx";
import Auth from "./auth/Auth.jsx";
import AdminHome from "./components/Admin/home.jsx";
import AdminAbout from "./components/Admin/about/About.jsx";
import AdminProjet from "./components/Admin/projet/Projet.jsx";
import ChercheurHome from "./components/Chercheur/home.jsx";
import ChercheurAbout from "./components/Chercheur/about/About.jsx";
import ChercheurProjet from "./components/Chercheur/projet/Projet.jsx";
import Compte from "./components/Admin/compte/compte.jsx"
import Comptechercheur from "./components/Chercheur/compte/compte.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // Set a default role

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  return (
    <Routes>
      <Route exact path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Auth />} />
      {role === "administrateur" && (
        <>
          <Route path="/home" element={<AdminHome />} />
          <Route path="/admin-projet" element={<AdminProjet />} />
          <Route path="/admin-about" element={<AdminAbout />} />
          <Route path="/Mon-compte" element ={<Compte />} />
        </>
      )}
      {role === "chercheur" && (
        <>
          <Route path="/home" element={<ChercheurHome />} />
          <Route path="/chercheur-projet" element={<ChercheurProjet />} />
          <Route path="/chercheur-about" element={<ChercheurAbout />} />
          <Route path="/Mon-compte" element ={<Comptechercheur />} />
        </>
      )}
    </Routes>
  );
};

export default App;
