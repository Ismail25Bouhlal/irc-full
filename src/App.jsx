import React from "react";
import Login from "./auth/login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signeup" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
