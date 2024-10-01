import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import logo from "../../../assets/irc-logo-rb.png";
import "./Users.css";
import { Container, Alert } from "react-bootstrap";
import EditUserModal from "../userEdit/userEdit";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost/irc/users.php")
      .then((response) => {
        console.log(response.data); // Log the response data for debugging
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Error: Expected an array of users");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleEvaluate = (id) => {
    axios
      .post("http://localhost/irc/moveToEvaluateur.php", { id })
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setMessage(response.data.error);
        } else {
          setMessage("User moved to evaluateur table successfully");
          // Update the user in the local state after moving to evaluateur table
          const updatedUsers = users.map((user) =>
            user.idchercheur === id ? { ...user, isEvaluateur: true } : user
          );
          setUsers(updatedUsers);
        }
      })
      .catch((error) => {
        console.error("Error moving user to evaluateur:", error);
      });
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
    // Add your delete logic here
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setShowEditModal(true);
  };

  const handleSave = (id, updatedUser) => {
    axios
      .post("http://localhost/irc/updateUser.php", { id, ...updatedUser })
      .then((response) => {
        if (response.data.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.idchercheur === id ? { ...user, ...updatedUser } : user
            )
          );
          setMessage("User updated successfully");
          setShowEditModal(false);
        } else {
          setMessage(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
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
              Accueil
            </div>
          </Link>
          <Link to={"/admin-projet"}>
            <div className="sidebar-item">
              <FaFolder style={{ marginRight: "8px" }} />
              Compétition
            </div>
          </Link>
          <Link to={"/utilisateurs"}>
            <div className="sidebar-item">
              <FiUsers style={{ marginRight: "8px" }} />
              Utilisateurs
            </div>
          </Link>
          <div className="sidebar-item">
            <FaUserPen style={{ marginRight: "8px" }} />
            Évaluation
          </div>
        </>
      </div>
      <div className="main-container">
        <Container className="main-content">
          <h2 className="content-title">Liste des Chercheurs</h2>
          {message && <Alert variant="info">{message}</Alert>}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.idchercheur}</td>
                    <td>
                      {user.nom}{" "}
                      {user.isEvaluateur && <span>(Évaluateur)</span>}
                    </td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>{user.telephone}</td>
                    <td>
                      <button
                        className="eva action-btn"
                        onClick={() => handleEvaluate(user.idchercheur)} // Pass user.user_id
                      >
                        Évaluateur
                      </button>
                      <button
                        className="del action-btn"
                        onClick={() => handleDelete(user.idchercheur)}
                      >
                        Supprimer
                      </button>
                      <button
                        className="edit action-btn"
                        onClick={() => handleEdit(user)}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
        {showEditModal && (
          <EditUserModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            user={currentUser}
            handleSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
