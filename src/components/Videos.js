import React from "react";

const Videos = ({ videoSrc }) => {
  return (
    <video
      src={videoSrc}
      controls
      style={{ width: "100%", borderRadius: "10px" }}
    ></video>
  );
};

export default Videos;
