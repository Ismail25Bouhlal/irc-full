import React from "react";
import "./navbar.css";
import logo from "../../../assets/irc-logo-rb.png";
import { Link } from "react-router-dom";
import { AiFillFolderOpen } from "react-icons/ai";
import { AiFillQuestionCircle } from "react-icons/ai";

const style = {
  container: {
    backgroundPposition: "center",
    backgroundSsize: "center",
    paddingRight: "2rem",
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "colmun",
    minHeight: "102vh",
    // height: "100vh", // Adjust the height as needed
  },
};

// const st = {
//   cont: {
//     marginRight: "10rem",
//     paddingLeft: "5rem",
//   },
// };

const text = {
  text: {
    color: "black",
    margin: "0 auto", // Center text horizontally
    paddingBottom: "20px", // Adjust padding to move text downward
    fontFamily: '"Open Sans", sans-serif',
    fontSize: "2.5rem", // Adjust font size as needed
  },
};

const Navbar = () => {
  return (
    <div className="site-wrapper">
      <div className="auth__form-container_image">
        <img src={logo} alt="" />
        <ul className="nav-links">
          <Link to="/Mon-compte">
            <li>Mon Compte</li>
          </Link>
          <Link to="/login">
            <li>Se deconnecter</li>
          </Link>
        </ul>
      </div>
      <div className="pt-table" style={style.centeredContainer}>
        <div
          className="pt-tablecell page-home relative"
          style={style.container}
        >
          <div className="overlay"></div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
                <div className="page-title  home text-center">
                  <span className="heading-page" style={text.text}>
                    {" "}
                    Bienvenue Chercheur!
                  </span>
                  <p className="mt20">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>

                <div className="hexagon-menu">
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <Link to="/chercheur-projet" className="hex-content">
                      <span className="hex-content-inner">
                        <span className="title">Compétitions</span>
                        <i>
                          <AiFillFolderOpen className="ic" />
                        </i>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <Link to="/about" className="hex-content">
                      <span className="hex-content-inner">
                        {/* <span className="icon"> */}
                        <i>
                          <AiFillQuestionCircle className="ic" />
                        </i>
                        {/* </span> */}
                        <span className="title">à propos</span>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a className="hex-content">
                      <span className="hex-content-inner">
                        <span className="icon">
                          <i className="fa fa-braille"></i>
                        </span>
                        <span className="title">Services</span>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a className="hex-content">
                      <span className="hex-content-inner">
                        <span className="icon">
                          <i className="fa fa-id-badge"></i>
                        </span>
                        <span className="title">Resume</span>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a className="hex-content">
                      <span className="hex-content-inner">
                        <span className="icon">
                          <i className="fa fa-life-ring"></i>
                        </span>
                        <span className="title">Works</span>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a className="hex-content">
                      <span className="hex-content-inner">
                        <span className="icon">
                          <i className="fa fa-clipboard"></i>
                        </span>
                        <span className="title">Testimonials</span>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="hexagon-item">
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div className="hex-item">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <a className="hex-content">
                      <span className="hex-content-inner">
                        <span className="icon">
                          <i className="fa fa-map-signs"></i>
                        </span>
                        <span class="title">Contact</span>
                      </span>
                      <svg
                        viewBox="0 0 173.20508075688772 200"
                        height="200"
                        width="174"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                          fill="#1e2530"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
