import React from "react";
import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import About from "./about/About";
import "./home.css";
import Projet from "./projet/Projet";

const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/projet" element={<Projet />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default Home;
