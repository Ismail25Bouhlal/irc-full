import { useEffect } from "react";
import $ from "jquery";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./about.css";

const APropos = () => {
  return (
    <div className="apropos">
      <h1 className="title">Acceuill</h1>

      <p>dolore temporibus culpa blanditiis tenetur? Harum modi quasi magnam cumque enim officiis iusto obcaecati?</p>

      <h2 className="second_title">For Membres</h2>
    </div>
  );
};

const HistoireDeCreation = () => {
  return <div>Content for Histoire de Creation section</div>;
};

const Missions = () => {
  return <div>Content for Missions section</div>;
};

const Organisation = () => {
  return <div>Content for Organisation section</div>;
};

const PlanDAction = () => {
  return <div>Content for plan d'action-2019-2021 section</div>;
};

const About = () => {
  const [activeSection, setActiveSection] = useState("a_propos");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleToggleClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    $(".toggle").click(function () {
      $(".menu").toggleClass("active");
    });
  }, []);

  return (
    <div>
      <div className="toggle" onClick={handleToggleClick}>
        <a>
          <i>{menuOpen ? <AiOutlineClose /> : <FaBars />}</i>
        </a>
      </div>
      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a
              href="#"
              className={activeSection === "a_propos" ? "active" : ""}
              onClick={() => handleSectionClick("a_propos")}
            >
              a propos
            </a>
          </li>
          <li>
            <a
              href="#"
              className={
                activeSection === "histoire_de_creation" ? "active" : ""
              }
              onClick={() => handleSectionClick("histoire_de_creation")}
            >
              Histoire de Creation
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeSection === "missions" ? "active" : ""}
              onClick={() => handleSectionClick("missions")}
            >
              Missions
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeSection === "organisation" ? "active" : ""}
              onClick={() => handleSectionClick("organisation")}
            >
              Organisation
            </a>
          </li>
          <li>
            <a
              href="#"
              className={activeSection === "plan_d_action" ? "active" : ""}
              onClick={() => handleSectionClick("plan_d_action")}
            >
              plan d'action-2019-2021
            </a>
          </li>
        </ul>
      </div>

      {/* Render different section components based on the activeSection state */}
      {activeSection === "a_propos" && <APropos />}
      {activeSection === "histoire_de_creation" && <HistoireDeCreation />}
      {activeSection === "missions" && <Missions />}
      {activeSection === "organisation" && <Organisation />}
      {activeSection === "plan_d_action" && <PlanDAction />}
    </div>
  );
};

export default About;
