import React, { useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import profileImage from "../imgs/swetchweb.png"; // Import the image file
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useEffect(() => {
    // Apply GSAP animation
    gsap.to(".hero-image img", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top", // When the top of .hero hits the top of the viewport
        end: "bottom top", // When the bottom of .hero leaves the viewport
        scrub: true, // Smooth animation
      },
      opacity: 0, // Fade out
      filter: "blur(20px)", // Apply blur
      scale: 1.2, // Slight zoom-out effect
    });
    const split = new SplitType(".txt-wrapper p", {
      types: "lines, words, chars",
    });
    const sections = gsap.utils.toArray("section");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".txtwrapper p",
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.1,
        markers: false,
      },
    });

    tl.to(split.chars, {
      color: "#dadada",
      stagger: 1,
    });
  }, []);

  return (
    <section className="hero">
      <div className="intro">
        <div className="txt-wrapper">
          <p>
            Hi, I am saim zair i am doing this ttext because i wanna try some
            effects on it so i hope you will enjoy
          </p>
        </div>
        {/* <h1>Saim Zair</h1>
        <h2>Front-end Developer / UI Designer</h2> */}
        <div className="social-icons">
          <a
            href="mailto:saimzair@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope size={24} />
          </a>
          <a
            href="https://github.com/saimzair"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/saimzair"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="hero-image">
        <img src={profileImage} alt="Saim Zair" />
      </div>
      <div className="hero-divider"></div>
    </section>
  );
};

export default Hero;
