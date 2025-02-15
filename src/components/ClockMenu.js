import React, { useEffect } from "react";
import { gsap } from "gsap";
import "./ClockMenu.css";

const ClockMenu = ({ activeSection }) => {
  useEffect(() => {
    const menu = document.querySelector(".clock-menu");

    // Define the callback functions
    const handleMouseEnter = () => {
      gsap.to(".clock-menu", { x: 0, duration: 0.5 });
      gsap.to(".menu-item", { opacity: 1, stagger: 0.1, duration: 0.5 });
    };

    const handleMouseLeave = () => {
      gsap.to(".clock-menu", { x: "-150px", duration: 0.5 });
      gsap.to(".menu-item", { opacity: 0, stagger: -0.1, duration: 0.5 });
    };

    // Add event listeners
    menu.addEventListener("mouseenter", handleMouseEnter);
    menu.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup by removing the exact same functions
    return () => {
      menu.removeEventListener("mouseenter", handleMouseEnter);
      menu.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="clock-menu">
      <nav>
        <a
          href="#home"
          className={`menu-item ${activeSection === "home" ? "active" : ""}`}
        >
          Home
        </a>
        <a
          href="#about"
          className={`menu-item ${activeSection === "about" ? "active" : ""}`}
        >
          About
        </a>
        <a
          href="#projects"
          className={`menu-item ${
            activeSection === "projects" ? "active" : ""
          }`}
        >
          Projects
        </a>
        <a
          href="#skills"
          className={`menu-item ${activeSection === "skills" ? "active" : ""}`}
        >
          Skills
        </a>
        <a
          href="#contact"
          className={`menu-item ${activeSection === "contact" ? "active" : ""}`}
        >
          Contact
        </a>
      </nav>
    </div>
  );
};

export default ClockMenu;
