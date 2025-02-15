import React from "react";
import video24 from "../videos/video24.mp4";

const Projects = () => {
  return (
    <div>
      <h2>Projects</h2>
      <video
        src={video24}
        controls
        style={{ width: "100%", borderRadius: "10px" }}
      ></video>
    </div>
  );
};

export default Projects;
