import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
export function initAnimations() {
  const sections = gsap.utils.toArray("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Highlight navbar links based on scroll position
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => setActiveLink(section.id),
      onLeaveBack: () => setActiveLink(section.id),
    });
  });

  // Smooth scrolling for navbar links
  navLinks.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetElem = document.querySelector(e.target.getAttribute("href"));

      gsap.to(window, {
        scrollTo: {
          y: targetElem,
          autoKill: false,
        },
        duration: 0.8,
        ease: "power1.out",
      });
    });
  });

  // Function to set active link
  function setActiveLink(sectionId) {
    const capsule = document.querySelector(".active-indicator"); // Select the traveling capsule
    const navLinks = document.querySelectorAll(".nav-links a"); // Select all navigation links

    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");

        // Get the position and width of the active link
        const { offsetLeft, offsetWidth } = link;

        // Center the capsule on the link
        capsule.style.transform = `translateX(${
          offsetLeft + offsetWidth / 2 - capsule.offsetWidth / 2
        }px)`;
        capsule.style.width = `${offsetWidth + 30}px`;
        capsule.style.height = `20px`;
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Color fading between #D7D7D7 and black on scroll
  const sectionIds = [
    "about",
    // "portfolio",
    "skills",
    "contact",
    "filmmaking",
    "voiceover",
    "softwaredev",
  ]; // List of sections by id
  const sectionColors = {
    hero: "#d7d7d76b",
    about: "#000000",
    // about: "#d7d7d7",
    // portfolio: "#a5a9ae",
    // skills: "#534D4D",
    skills: "#000000",
    voiceover: "000000",
    contact: "#000000", // Blue for "Contact"
    // Blue for "Contact"
    // softwaredev: "#000000",
  };
  sectionIds.forEach((id) => {
    ScrollTrigger.create({
      trigger: `#${id}`, // Target sections by their ID
      markers: false, // Optional: display markers for debugging
      start: "top 80%", // When the top of the section reaches 50% of the viewport
      end: "bottom 0%", // End when the bottom of the section reaches 0% of the viewport

      onEnter: () => {
        // Change to the current section's background color
        const bgColor = sectionColors[id];
        gsap.to("body", { duration: 0.5, backgroundColor: bgColor });
      },

      onLeaveBack: () => {
        // When scrolling back, return to the previous section's color.
        // For simplicity, we just set the previous section's background color.
        const prevSectionId = sectionIds[sectionIds.indexOf(id) - 1] || null;
        const prevColor = prevSectionId
          ? sectionColors[prevSectionId]
          : "#ffffff";
        gsap.to("body", { duration: 1.0, backgroundColor: prevColor });
      },
    });
  });

  // Cleanup ScrollTriggers on unmount
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
