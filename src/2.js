import React, { useEffect } from "react";
import { initAnimations } from "./animations";
import "./App.css";

// Importing your components
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import FiltersGallery from "./components/Portfolio";
import Home from "./components/Home";
import Skills from "./components/Skills";

function App() {
  useEffect(() => {
    const cleanup = initAnimations(); // Initialize animations
    return cleanup; // Cleanup animations on component unmount
  }, []);

  const components = [
    { id: "about", Component: About },
    { id: "filters", Component: FiltersGallery },
    { id: "projects", Component: Projects },
    { id: "skills", Component: Skills },
    { id: "contact", Component: Contact },
  ];

  return (
    <div id="page" className="site">
      <div id="feather" className="feather"></div>

      <header id="masthead" className="site-header" role="banner">
        <nav className="anchor-nav" role="navigation">
          <a href="#home" className="anchor">
            Home
          </a>
          {components.map(({ id }) => (
            <a href={`#${id}`} key={id} className="anchor">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>
      </header>

      <main id="content" className="site-content" role="main">
        {/* Vertical Section: Home */}
        <section id="home" className="full-screen gradient-orange">
          <Home />
        </section>

        {/* Horizontal Panels Section */}
        <section id="panels">
          <div
            id="panels-container"
            style={{ width: `${components.length * 100}%` }}
          >
            {components.map(({ id, Component }, index) => (
              <article
                key={id}
                id={id}
                className={`panel full-screen ${
                  index % 2 === 0 ? "gradient-green" : "gradient-blue"
                }`}
              >
                <div className="container">
                  <Component /> {/* Render the respective component */}
                  {/* Navigation Buttons */}
                  <div className="panels-navigation">
                    {index > 0 && (
                      <div className="nav-panel prev-panel" data-sign="minus">
                        <a
                          href={`#${components[index - 1].id}`}
                          className="anchor"
                        >
                          Prev
                        </a>
                      </div>
                    )}
                    {index < components.length - 1 && (
                      <div className="nav-panel next-panel" data-sign="plus">
                        <a
                          href={`#${components[index + 1].id}`}
                          className="anchor"
                        >
                          Next
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Vertical Section: Map */}
        <section id="map" className="full-screen gradient-orange"></section>
      </main>
    </div>
  );
}

export default App;

import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initAnimations() {
  const panelsContainer = document.querySelector("#panels-container");
  const panels = gsap.utils.toArray("#panels-container .panel");
  const sections = gsap.utils.toArray("section");

  let tween; // Declare tween to be used for scroll position calculation

  // ScrollTrigger for vertical sections
  sections.forEach((section, index) => {
    if (section.id === "panels") {
      // Horizontal ScrollTrigger for the panels container
      tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#panels-container",
          pin: true,
          start: "top top",
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            inertia: false,
            duration: { min: 0.1, max: 0.1 },
          },
          end: () => "+=" + (panelsContainer.offsetWidth - window.innerWidth),
        },
      });
    } else {
      // Standard vertical scroll for non-panel sections
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        markers: false,
        pin: index === 0,
      });
    }
  });

  // Main navigation event listeners for smooth scrolling between sections
  document.querySelectorAll(".anchor").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Ensure tween and scrollTrigger are ready
      if (!tween || !tween.scrollTrigger) return;

      const targetElem = document.querySelector(e.target.getAttribute("href"));
      let y = targetElem;

      // Check if the target is a panel and calculate horizontal scroll
      if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
        const totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start;
        const totalMovement = (panels.length - 1) * targetElem.offsetWidth;
        y = Math.round(
          tween.scrollTrigger.start +
            (targetElem.offsetLeft / totalMovement) * totalScroll
        );
      }

      // Smooth scroll to the target element
      gsap.to(window, {
        scrollTo: {
          y: y,
          autoKill: false,
        },
        duration: 1,
      });
    });
  });

  // Cleanup function to unregister GSAP animations
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
