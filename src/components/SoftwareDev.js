import React from "react";
import "./SoftwareDev.css";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Todo App",
    description:
      "A simple and intuitive app to manage daily tasks efficiently.",
    tech: ["React", "Node.js", "TailwindCSS"],
    image: "https://via.placeholder.com/300x200", // Replace with real image
    liveLink: "#",
    codeLink: "#",
  },
  {
    title: "Multiple Emails sender",
    description:
      "sending email with certificate attached to  multiples receivers",
    tech: ["Python", "Gmail Api", "Google Console"],
    image:
      "https://selzy.com/en/blog/wp-content/uploads/2022/06/how-to-send-an-email-to-multiple-recipients-individually.png", // Replace with real image
    // liveLink: "#",
    codeLink: "https://github.com/sweeeetch/send-emails-with-gmail-api-python",
  },
  {
    title: "E-Commerce App",
    description:
      "An online shopping platform with a seamless browsing experience.",
    tech: ["React", "Node.js", "TailwindCSS"],
    image: "https://via.placeholder.com/300x200", // Replace with real image
    liveLink: "#",
    codeLink: "#",
  },
];

const SoftwareDev = () => {
  return (
    <section id="software-dev" className="software-dev">
      {/* <h2 className="section-title">Software Development</h2> */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img
              src={project.image}
              alt={project.title}
              className="project-img"
            />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-btn"
                >
                  <FaExternalLinkAlt /> Preview
                </a>
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="code-btn"
                >
                  <FaGithub /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SoftwareDev;
