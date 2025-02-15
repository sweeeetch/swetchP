////
import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import "./App.css";

// Importing the components
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const App = () => {
  useEffect(() => {
    const sections = gsap.utils.toArray(".section"); // Get all sections
    const container = document.querySelector(".sections-container"); // Main scrolling container

    // Smooth scrolling for navigation links
    document.querySelectorAll(".menu a").forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href"); // Get the target section ID
        const targetElem = document.querySelector(targetId); // Find the target section

        if (targetElem) {
          const sectionIndex = sections.indexOf(targetElem); // Get index of the target section
          const scrollPosition =
            (container.scrollWidth / sections.length) * sectionIndex; // Calculate scroll position

          // Smoothly scroll to the target section
          gsap.to(window, {
            scrollTo: {
              x: scrollPosition, // Scroll horizontally
              autoKill: false,
            },
            duration: 1,
            ease: "power2.inOut",
          });
        }
      });
    });

    // Horizontal scrolling animation for sections
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1), // Move through all sections horizontally
      ease: "none",
      scrollTrigger: {
        trigger: ".sections-container",
        pin: true, // Pin the container during scrolling
        scrub: 1, // Smooth scrubbing
        start: "top top", // Start when the top of the container hits the top of the viewport
        end: () => container.scrollWidth - window.innerWidth, // Fix end calculation
      },
    });
  }, []);

  return (
    <div className="App">
      {/* Navigation Menu */}
      <nav className="menu">
        <a href="#Home">Home</a>
        <a href="#About">About</a>
        <a href="#Projects">Projects</a>
        <a href="#Skills">Skills</a>
        <a href="#Contact">Contact</a>
      </nav>

      {/* Sections Container */}
      <div className="sections-container">
        <section className="section" id="Home">
          <Home />
        </section>
        <section className="section" id="About">
          <About />
        </section>
        <section className="section" id="Projects">
          <Projects />
        </section>
        <section className="section" id="Skills">
          <Skills />
        </section>
        <section className="section" id="Contact">
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default App;
