import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import axios from "axios";
import "./Project_Soumi.css";
import logo from "../../../assets/irc-logo-rb.png";

const Project_Soumi = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailedProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost/irc/ProjectSoumi.php?action=getDetailedProjects"
        );
        if (response.data.status === "success") {
          setProjects(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedProjects();
  }, []);

  const handleDownloadPDF = (projectId) => {
    // Redirect to backend endpoint with projectId
    window.open(
      `http://localhost/irc/pdfDownload.php?projectId=${projectId}`,
      "_blank"
    );
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="project-soumi-container">
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

      <div className="project-soumi-content">
        <h2 className="title-soumi">Project Soumi Details</h2>
        {projects.length > 0 ? (
          <table className="project-soumi-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Chercheur Name</th>
                <th>Date Start</th>
                <th>Date End</th>
                <th>Domain</th>
                <th>Budget Description</th>
                <th>Budget Amount</th>
                <th>Team Name</th>
                <th>Action</th> {/* Add Action column */}
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.idprojet}</td>
                  <td>{project.titre_projet || "Untitled"}</td>
                  <td>{project.chercheur_nom || "Unknown"}</td>
                  <td>{project.date_debut_projet || "N/A"}</td>
                  <td>{project.date_fin_projet || "N/A"}</td>
                  <td>{project.Domaine || "N/A"}</td>
                  <td>{project.valeur_description || "N/A"}</td>
                  <td>{project.valeur_montant || "N/A"}</td>
                  <td>{project.nom_equipe || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleDownloadPDF(project.idprojet)}
                      className="download-button"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No project details found.</p>
        )}
      </div>
    </div>
  );
};

export default Project_Soumi;
