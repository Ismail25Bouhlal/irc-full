import React from "react";
import Navbar from "./navbar/Navbar";
import { Route, Routes, Link } from "react-router-dom";
import About from "./about/About";

const Home = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <Link to="/about">Go to About</Link>
    </>
  );
};

export default Home;
