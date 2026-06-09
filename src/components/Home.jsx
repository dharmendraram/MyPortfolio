import React, { useRef, useState } from "react";

const ImageWithGlow = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-80 h-80 md:w-110 md:h-110 rounded-full p-0.5 overflow-hidden cursor-pointer group"
    >
      {visible && (
        <div
          className="pointer-events-none blur-2xl bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 size-60 absolute z-0 transition-opacity duration-300"
          style={{ top: position.y - 120, left: position.x - 120 }}
        />
      )}
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
        <img
          src={user}
          alt="Hero"
          loading="lazy"
          className="w-full h-full object-cover transition duration-[3500ms] ease-in-out group-hover:scale-110 group-hover:rotate-3"
        />
      </div>
    </div>
  );
};

import HeadingHero from "../utils/HeadingHero";
import { useTheme } from "../context/ThemeContext";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaViber,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import user from "../assets/hero/pic3.png";
import { downloadCV } from "../utils/generateCV";

const Home = () => {
  const { isDark } = useTheme();
  
  return (
    <section
      id={`home`}
      className="relative w-full flex items-center justify-center pb-3"
    >
      {/* <div className="absolute inset-0 bg-[url('./assets/hero/pic.png')] bg-cover bg-center bg-no-repeat"></div> */}
      {/* <div className="absolute inset-0"></div> */}
      <div className="container z-10 mx-auto px-2 flex flex-col md:flex-row items-center md:px-8">
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-light capitalize  tracking-wide text-teal-400">
            I'm Dharmendra Kumar Ram
          </h3>
          <HeadingHero />
          <p className={`mt-4 max-w-3xl text-justify transition-colors duration-300 ${
            isDark ? 'text-white/40' : 'text-gray-600'
          }`}>
            I am a Full-Stack Developer with professional experience in building
  scalable web applications, enterprise solutions, and digital platforms.
  Currently working at National Incubation & Research Center (NIRC), I
  specialize in React.js, JavaScript, TypeScript, Python Django, Java
  Grails, MySQL, PostgreSQL, and modern frontend technologies. I enjoy
  transforming complex business requirements into efficient, user-friendly,
  and high-performance digital solutions that create real impact.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white hover:opacity-90 transition-opacity
            "
            >
              {" "}
              View my Work
            </button>

             <button
              onClick={downloadCV}
              className={`px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 cursor-pointer hover:bg-teal-700 ${
                isDark 
                  ? 'bg-white/10 text-white' 
                  : 'bg-gray-900/10 text-gray-900'
              }`}
            >
              {" "}
              Download CV
            </button> 
          </div>
        </div>

       <div className="flex-1 mt-10 md:mt-0 flex justify-center md:justify-end relative">
        {/* Main Circle with Image */}
        <ImageWithGlow user={user} />
      </div>
      </div>
    </section>
  );
};

export default Home;
