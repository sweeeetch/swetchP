import React, { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle } from "react-icons/fa"; // Import checkmark icon
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const formId = process.env.REACT_APP_FORMSPREE_FORM_ID;
  const [state, handleSubmit] = useForm(formId);
  const [formStatus, setFormStatus] = useState("");
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const titleRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => {
    gsap.set(contactRef.current, { opacity: 0, y: 100 });

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
    ScrollTrigger.create({
      trigger: contactRef.current,
      start: "top 80%",
      end: "bottom 40%",
      onEnter: () =>
        gsap.to(contactRef.current, { opacity: 1, y: 0, duration: 0.6 }),
      onEnterBack: () =>
        gsap.to(contactRef.current, { opacity: 1, y: 0, duration: 0.6 }),
    });
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setFormStatus("Message sent successfully!");
      setTimeout(() => setFormStatus(""), 5000);
      setInputValues({ name: "", email: "", phone: "", message: "" }); // Reset fields
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email validation

  return (
    <div ref={contactRef} className="contact-container">
      <svg
        ref={svgRef}
        className="contact-me-svg"
        width="250"
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
        >
          CONTACT
        </text>
      </svg>

      <div className="divider"></div>

      {formStatus && <p className="form-status">{formStatus}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            name="name"
            placeholder="ENTER YOUR NAME*"
            value={inputValues.name}
            onChange={handleChange}
            required
          />
          {inputValues.name && <FaCheckCircle className="check-icon" />}
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="ENTER YOUR EMAIL*"
            value={inputValues.email}
            onChange={handleChange}
            required
          />
          {isValidEmail(inputValues.email) && (
            <FaCheckCircle className="check-icon" />
          )}
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="input-wrapper">
          <input
            type="tel"
            name="phone"
            placeholder="PHONE NUMBER"
            value={inputValues.phone}
            onChange={handleChange}
          />
          {inputValues.phone && <FaCheckCircle className="check-icon" />}
        </div>

        <div className="input-wrapper">
          <textarea
            name="message"
            placeholder="YOUR MESSAGE*"
            value={inputValues.message}
            onChange={handleChange}
            required
          ></textarea>
          {inputValues.message && <FaCheckCircle className="check-icon" />}
        </div>

        <button type="submit" disabled={state.submitting}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Contact;
