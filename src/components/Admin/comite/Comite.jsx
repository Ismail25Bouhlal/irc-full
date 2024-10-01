import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaHome, FaFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserPen } from "react-icons/fa6";
import { MdModeEditOutline, MdDeleteForever } from "react-icons/md";
import "./Comite.css";
import logo from "../../../assets/irc-logo-rb.png";

function Comite() {
  const [selectedItem, setSelectedItem] = useState("Comite");
  const [comites, setComites] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleComiteClick = (comite) => {
    // Handle comite click
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="IRC Logo" className="logo" />
        </div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div className="sidebar-item" onClick={() => handleItemClick(null)}>
            <FaHome style={{ marginRight: "8px" }} />
            Home
          </div>
        </Link>
        <div
          className={`sidebar-item ${
            selectedItem === "Comite" ? "active" : ""
          }`}
          onClick={() => handleItemClick("Comite")}
        >
          <FaFolder style={{ marginRight: "8px" }} />
          Comite
        </div>
        <Link to={"/Utilisateurs"}>
          <div className="sidebar-item">
            <FiUsers style={{ marginRight: "8px" }} />
            Utilisateurs
          </div>
        </Link>
        <div className="sidebar-item">
          <FaUserPen style={{ marginRight: "8px" }} />
          Evaluation
        </div>
      </div>
      {selectedItem === "Comite" && (
        <Container
          
          style={{ marginTop: "15%", marginLeft: "95%" }} 
        >
          <h1 style={{ marginRight: "-100%", color: "black" }}>COMITE</h1>
          <div>
            {/* Add shadow to table */}
            <Link to={"/AjouterunComite"}>
              <button
                className="btn btn-success mb-3"
                style={{ marginRight: "20px" }}
              >
                + Ajouter un comite
              </button>
            </Link>
            {/* Render comites table */}
            <table
              className="table table-bordered table-hover"
              style={{ width: "180%" }}
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Titre</th>
                  <th scope="col">Libellé</th>
                  <th scope="col">Date de début</th>
                  <th scope="col">Date de fin</th>
                  <th scope="col">enligne</th>
                  <th scope="col">Date de comite</th>
                  <th scope="col" className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Map over comites and render each row */}
                {comites.map((comite, index) => (
                  <tr key={index} onClick={() => handleComiteClick(comite)}>
                    <th scope="row">{index + 1}</th>
                    <td>{comite.titre}</td>
                    <td>{comite.libelle}</td>
                    <td>{comite.date_debut}</td>
                    <td>{comite.date_fin}</td>
                    <td>{comite.enligne === "1" ? "Oui" : "Non"}</td>
                    <td>{comite.annee_comite}</td>
                    <td className="text-center">
                      <Link
                        to={{
                          pathname: "/ModifierComite",
                          state: { selectedComite: JSON.stringify(comite) },
                        }}
                      >
                        <button
                          style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            marginRight: "5px",
                            border: "none",
                            borderRadius: "10%",
                          }}
                        >
                          <MdModeEditOutline />
                        </button>
                      </Link>
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          marginRight: "5px",
                          border: "none",
                          borderRadius: "10%",
                        }}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      )}
    </div>
  );
}

export default Comite;
