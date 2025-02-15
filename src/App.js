import React, { useEffect, useState } from "react";
import "./App.css";
import Logo from "./imgs/logo1.png";
import { initAnimations } from "./animations";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import FilmMaking from "./components/FilmMaking";
import VoiceOver from "./components/VoiceOver";
import SoftwareDev from "./components/SoftwareDev";
import { FaBars, FaTimes } from "react-icons/fa";

const App = () => {
  const [showFilmMaking, setShowFilmMaking] = useState(false);
  const [showVoiceOver, setShowVoiceOver] = useState(false);
  const [showSoftwareDev, setShowSoftwareDev] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    const cleanup = initAnimations();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanup();
    };
  }, []);

  const handleLinkClick = (id) => {
    setActiveLink(id);
    setMenuOpen(false);
  };

  return (
    <div className="homepage-container">
      <header className="navbar">
        <div className="logo1">
          <img src={Logo} alt="Logo" width={70} height={70} />
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={menuOpen ? "nav-open" : "nav-closed"}>
          <ul className="nav-links">
            <div
              className="active-indicator"
              style={{ left: `${activeLink * 100}px` }}
            ></div>
            <li>
              <a
                href="#hero"
                className={activeLink === "hero" ? "active" : ""}
                onClick={() => handleLinkClick("hero")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeLink === "about" ? "active" : ""}
                onClick={() => handleLinkClick("about")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeLink === "skills" ? "active" : ""}
                onClick={() => handleLinkClick("skills")}
              >
                Skills
              </a>
            </li>
            {showFilmMaking && (
              <li>
                <a
                  href="#filmmaking"
                  className={activeLink === "filmmaking" ? "active" : ""}
                  onClick={() => handleLinkClick("filmmaking")}
                >
                  Filmmaking
                </a>
              </li>
            )}
            {showSoftwareDev && (
              <li>
                <a
                  href="#softwaredev"
                  className={activeLink === "softwaredev" ? "active" : ""}
                  onClick={() => handleLinkClick("softwaredev")}
                >
                  Software Dev
                </a>
              </li>
            )}
            {showVoiceOver && (
              <li>
                <a
                  href="#voiceover"
                  className={activeLink === "voiceover" ? "active" : ""}
                  onClick={() => handleLinkClick("voiceover")}
                >
                  Voice Over
                </a>
              </li>
            )}
            <li>
              <a
                href="#contact"
                className={activeLink === "contact" ? "active" : ""}
                onClick={() => handleLinkClick("contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section id="hero" className="hero">
        <Hero />
      </section>
      <section id="about" className="about">
        <About />
      </section>
      <section id="skills">
        <Skills
          setShowFilmMaking={setShowFilmMaking}
          setShowSoftwareDev={setShowSoftwareDev}
          setShowVoiceOver={setShowVoiceOver}
        />
      </section>
      {showFilmMaking && (
        <section id="filmmaking">
          <FilmMaking />
        </section>
      )}
      {showSoftwareDev && (
        <section id="softwaredev">
          <SoftwareDev />
        </section>
      )}
      {showVoiceOver && (
        <section id="voiceover">
          <VoiceOver />
        </section>
      )}
      <section id="contact" className="contact">
        <Contact />
      </section>
    </div>
  );
};

export default App;
