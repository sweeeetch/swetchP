import React from "react";
import "./Home.css";
import profileImage from "../imgs/IMG_6088.png"; // Import the image file

const Home = () => {
  return (
    <div className="board-container">
      {" "}
      {/* Use `className` in React */}
      <div className="background-grid">
        <div className="profile-container">
          <h1 className="board-title">Dhimas's Board</h1>
          {/* <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
          />{" "} */}
          {/* Use the imported image */}
          <div className="contact">
            <span>📧</span>
            <a href="mailto:connect@halodhimas.com">connect@halodhimas.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
