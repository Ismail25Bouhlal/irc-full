import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./MyProject.css";
import { FaHome, FaFolder } from "react-icons/fa";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";

const MyProject = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const idchercheur = Cookies.get("idchercheur")
        ? parseInt(Cookies.get("idchercheur"))
        : null;
      const idevaluateur = Cookies.get("idevaluateur")
        ? parseInt(Cookies.get("idevaluateur"))
        : null;

      try {
        const response = await axios.get(
          `http://localhost/irc/MyProject.php?action=getUserProjects&idchercheur=${idchercheur}&idevaluateur=${idevaluateur}`
        );

        if (response.data.status === "success") {
          setProjects(response.data.data);
        } else {
          alert("Failed to fetch projects: " + response.data.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("An error occurred while fetching your projects.");
      }
    };

    fetchProjects();
  }, []);

  const handleCompleteProject = (projectId) => {
    navigate("/Forum_ProjectChercheur", {
      state: { projectId }, // Pass projectId to Forum_Project component
    });
  };

  return (
    <div className="my-project-wrapper">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" className="sidebar-item">
          <FaHome className="icon" />
          Home
        </Link>
        <Link to="/chercheur-projet" className="sidebar-item">
          <FaFolder className="icon" />
          Competition
        </Link>
        <Link
          to="/MyProject"
          className="sidebar-item"
          style={{ textDecoration: "none" }}
        >
          <FaFolder style={{ marginRight: "8px" }} />
          My Project
        </Link>
      </div>

      {/* Main Content */}
      <div className="my-project-content">
        <h2 className="title">My Projects</h2>
        {projects.length > 0 ? (
          <table className="project-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.idprojet}>
                  <td>{project.idprojet}</td>
                  <td>{project.titre_projet || "Untitled Project"}</td>
                  <td
                    className={
                      project.isComplete
                        ? "status-completed"
                        : "status-not-completed"
                    }
                  >
                    {project.isComplete ? "Completed" : "Not Completed"}
                  </td>
                  <td>
                    {!project.isComplete && (
                      <button
                        className="complete-button"
                        onClick={() => handleCompleteProject(project.idprojet)}
                      >
                        Complete Project
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-projects">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default MyProject;
