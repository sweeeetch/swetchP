import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverVideoPlayer from "react-hover-video-player";
import { css } from "@emotion/css";
import Splitting from "splitting";
// import Video24 from "../videos/video24.mp4";
import arrow from "../imgs/image.png";

gsap.registerPlugin(ScrollTrigger);

const MovieSlider = lazy(() => import("./MovieSlider"));

const hoverOverlayWrapperStyle = css`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-family: sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const svgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1250);

  const quotes = useMemo(
    () => [
      {
        author: "Marcus Aurelius",
        text: "You have power over your mind—not outside events. Realize this, and you will find strength.",
      },
      {
        author: "Marcus Aurelius",
        text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
      },
      {
        author: "Shakespeare",
        text: "Some are born great, some achieve greatness, and some have greatness thrust upon them.",
      },
      {
        author: "Shakespeare",
        text: "All the world's a stage, and all the men and women merely players.",
      },
    ],
    []
  );

  useEffect(() => {
    Splitting();

    const ctx = gsap.context(() => {
      // Animate About Me Title & SVG
      gsap.fromTo(
        [titleRef.current, svgRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
        }
      );

      // Optimize Text Animation for Faster Appearance
      const textElements = document.querySelectorAll(
        "[data-splitting][data-effect28]"
      );
      textElements.forEach((el) => {
        const words = el.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Fade-in & Fade-out for Videos, Movies, Quotes
      ScrollTrigger.batch(
        [".videosContainer", ".movie-slider-container", ".quote-box"],
        {
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.8 }),
          onLeave: (batch) =>
            gsap.to(batch, { opacity: 0, y: 40, duration: 0.6 }),
          onEnterBack: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.8 }),
          onLeaveBack: (batch) =>
            gsap.to(batch, { opacity: 0, y: 40, duration: 0.6 }),
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const setStyleSheet = () => {
      const stylesheet = document.getElementById("dynamic-style");

      if (!stylesheet) {
        const link = document.createElement("link");
        link.id = "dynamic-style";
        link.rel = "stylesheet";
        link.type = "text/css";
        document.head.appendChild(link);
      }

      document.getElementById("dynamic-style").href = isMobile
        ? require("./About-mobile.css")
        : require("./About-desktop.css");
    };

    setStyleSheet();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250);
      setStyleSheet(); // Update styles on resize
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <section id="about" ref={containerRef} className="three">
      <div className="content__title" data-splitting data-effect28>
        <div className="about-me-container">
          <svg
            ref={svgRef}
            className="about-me-svg"
            width="404"
            height="107"
            viewBox="0 0 404 107"
            fill="none"
          >
            <rect
              x="4"
              y="4"
              rx={13}
              width="396"
              height="99"
              stroke="white"
              strokeWidth="8"
            />
            <text
              ref={titleRef}
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="white"
              fontSize="32"
              fontFamily="Arial, sans-serif"
              fontWeight="bold"
            ></text>
          </svg>
          <p
            ref={titleRef}
            className="about-me-text"
            data-splitting
            data-effect28
          >
            ABOUT&nbsp;ME
          </p>
        </div>
      </div>

      <div className="aboutContainer">
        <div className="videosContainer">
          <HoverVideoPlayer
            videoSrc={
              "https://res.cloudinary.com/dnn6y8vao/video/upload/v1739223030/video24_z7x9ec.mp4"
            }
            className="hoverVideo"
            hoverOverlayWrapperClassName={hoverOverlayWrapperStyle}
            hoverOverlay={<span></span>}
            loop={true}
          />
        </div>

        <div className="aboutContent">
          <p className="pp" data-splitting data-effect28>
            An Algerian Arab Man, Certified Cat, Languages & Cinema Lover
          </p>

          <p className="quote-heading" data-splitting data-effect28>
            Quotes
          </p>
          <div className="quote-box">
            <p className="quote-text">"{quotes[0].text}"</p>
            <p className="quote-author" data-splitting data-effect28>
              - {quotes[0].author}
            </p>
          </div>

          <div className="languages-container">
            <span className="lang-label">Speaking:</span>
            <button className="lang-button" data-hover="مرحبا!">
              Arabic
            </button>
            <button className="lang-button" data-hover="Hello!">
              English
            </button>
            <button className="lang-button" data-hover="Bonjour!">
              French
            </button>

            <span className="lang-label">Learning:</span>
            <button className="lang-button learning">German</button>
          </div>
          <div className="explore-container">
            <button className="explore-btn">EXPLORE</button>
            <img
              src={arrow}
              alt="sahm"
              className="explore-arrow"
              loading="lazy"
            />
          </div>
        </div>

        <div className="movie-slider-container">
          <Suspense fallback={<div>Loading...</div>}>
            <MovieSlider />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
