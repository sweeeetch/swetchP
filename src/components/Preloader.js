// components/Preloader.js
import React from "react";
import "./Preloader.css"; // You can create a CSS file for styling the preloader

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Preloader;
