import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import Splitting from "splitting";
import { ScrollTrigger } from "gsap/all";
import "./About.css"; // Import CSS module for styling
import HoverVideoPlayer from "react-hover-video-player";
import { css } from "@emotion/css";
import Video24 from "../videos/video24.mp4";
import arrow from "../imgs/image.png";
import MovieSlider from "./MovieSlider";
gsap.registerPlugin(ScrollTrigger);
const videoSrc = { Video24 };
// const hoverOverlayWrapperStyle = css
//   background-color: rgba(0, 0, 0, 0.6);
//   color: white;
//   font-family: sans-serif;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   font-size: 1.5rem;
//   font-weight: bold;
// ;
const quotes = [
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
];

const no_use = () => {
  // const getComputedStyleProperty = (property) => {
  //   return window.getComputedStyle(document.body).getPropertyValue(property);
  // };

  // const getBrightness = (color) => {
  //   const rgb = color.match(/\d+/g);
  //   const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  //   return brightness / 255;
  // };

  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [quote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    // const bgColor = getComputedStyleProperty("background-color");
    // setIsDarkMode(getBrightness(bgColor) < 0.5);
    // Initialize Splitting for the title text
    const s = Splitting();

    // Custom background color change on scroll
    // const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
    // scrollColorElems.forEach((colorSection, i) => {
    //   const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    //   const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;
    //   ScrollTrigger.create({
    //     trigger: colorSection,
    //     start: "top 50%",
    //     onEnter: () =>
    //       gsap.to(["body", ".about-me-text", ".pp"], {
    //         // backgroundColor: colorSection.dataset.bgcolor,
    //         color: colorSection.dataset.textcolor,
    //         overwrite: "auto",
    //       }),
    //     onLeaveBack: () =>
    //       gsap.to(["body", ".about-me-text", ".pp"], {
    //         backgroundColor: prevBg,
    //         color: prevText,
    //         overwrite: "auto",
    //       }),
    //   });
    // });

    // Titles with the custom "fx28" effect
    const elements = document.querySelectorAll(
      "[data-splitting][data-effect28]"
    );
    elements.forEach((el) => {
      const words = [...el.querySelectorAll(".word")];

      words.forEach((word) => {
        const chars = word.querySelectorAll(".char");
        const charsTotal = chars.length;

        gsap.fromTo(
          chars,
          {
            "will-change": "transform, filter",
            transformOrigin: "50% 100%",
            scale: (position) => {
              const factor =
                position < Math.ceil(charsTotal / 2)
                  ? position
                  : Math.ceil(charsTotal / 2) -
                    Math.abs(Math.floor(charsTotal / 2) - position) -
                    1;
              return gsap.utils.mapRange(
                0,
                Math.ceil(charsTotal / 2),
                0.5,
                2.1,
                factor
              );
            },
            y: (position) => {
              const factor =
                position < Math.ceil(charsTotal / 2)
                  ? position
                  : Math.ceil(charsTotal / 2) -
                    Math.abs(Math.floor(charsTotal / 2) - position) -
                    1;
              return gsap.utils.mapRange(
                0,
                Math.ceil(charsTotal / 2),
                0,
                60,
                factor
              );
            },
            rotation: (position) => {
              const factor =
                position < Math.ceil(charsTotal / 2)
                  ? position
                  : Math.ceil(charsTotal / 2) -
                    Math.abs(Math.floor(charsTotal / 2) - position) -
                    1;
              return position < charsTotal / 2
                ? gsap.utils.mapRange(
                    0,
                    Math.ceil(charsTotal / 2),
                    -4,
                    0,
                    factor
                  )
                : gsap.utils.mapRange(
                    0,
                    Math.ceil(charsTotal / 2),
                    0,
                    4,
                    factor
                  );
            },
            filter: "blur(12px) opacity(0)",
          },
          {
            ease: "power2.inOut",
            y: 0,
            rotation: 0,
            scale: 1,
            filter: "blur(0px) opacity(1)",
            scrollTrigger: {
              trigger: word,
              start: "top bottom+=40%",
              end: "top top+=15%",
              scrub: true,
            },
            stagger: {
              amount: 0.15,
              from: "center",
            },
          }
        );
      });
    });

    // Layers animation (optional)
    //   const layers = gsap.utils.toArray(".layer");
    //   const amount = layers.length;

    //   gsap.set(layers, { zIndex: (i) => amount - i });

    //   gsap.to(layers.reverse(), {
    //     clipPath: "circle(71% at 50% 50%)",
    //     duration: 1,
    //     ease: "power1.inOut",
    //   });
    //   const elementsToAnimate = [
    //     ".videosContainer",
    //     ".movie-slider-container",
    //     ".quote-box",
    //   ];

    //   elementsToAnimate.forEach((selector) => {
    //     gsap.set(selector, { opacity: 0, y: 100 });

    //     ScrollTrigger.create({
    //       trigger: selector,
    //       start: "top 80%",
    //       end: "bottom 40%",
    //       onEnter: () => gsap.to(selector, { opacity: 1, y: 0, duration: 0.6 }),
    //       onEnterBack: () =>
    //         gsap.to(selector, { opacity: 1, y: 0, duration: 0.6 }),
    //       onLeave: () => gsap.to(selector, { opacity: 0, y: 100, duration: 0.6 }),
    //       onLeaveBack: () =>
    //         gsap.to(selector, { opacity: 0, y: 100, duration: 0.6 }),
    //     });
    //   });
  }, []); // Empty dependency array ensures it runs only once after component mounts

  return (
    <section id="about" className="three">
      <div
        className="content__title"
        data-splitting
        data-effect28
        data-bgcolor="#000000"
        data-textcolor="#ffffff"
      >
        <div className="about-me-container">
          <svg
            className="about-me-svg"
            width="404"
            height="107"
            viewBox="0 0 404 107"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4"
              y="4"
              rx={13}
              width="396"
              height="99"
              stroke={"white"}
              strokeWidth="8"
            />
          </svg>
          <p className="about-me-text" data-splitting data-effect28>
            ABOUT&nbsp;ME
          </p>
        </div>
      </div>

      <div
        className="aboutContainer"
        data-bgcolor="#000000"
        data-textcolor="#ffffff"
      >
        <div className="videosContainer">
          <HoverVideoPlayer
            videoSrc={Video24}
            className="hoverVideo"
            hoverOverlayWrapperClassName={hoverOverlayWrapperStyle}
            hoverOverlay={
              <span>videos*</span> // The text will still be visible while hovering
            }
          />
        </div>

        <div className="aboutContent">
          <p className="pp" data-splitting data-effect28>
            An Algerian Arab Man and a Certified Cat & Languages & Cinema Lover
          </p>
          {/* <p className="pp">Cut & Languages Lover</p> */}

          <p className="quote-heading">Quotes</p>
          <div className="quote-box">
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author" data-splitting data-effect28>
              - {quote.author}
            </p>
          </div>

          <div class="explore-container">
            <button class="explore-btn">EXPLORE</button>
            <img src={arrow} alt="sahm" className="explore-arrow" />
          </div>
        </div>
        <div
          className="movie-slider-container"
          style={{ marginRight: 50, marginTop: 40 }}
        >
          <MovieSlider />
        </div>
      </div>
    </section>
  );
};

export default React.memo(no_use);
