import React from "react";
import HeadingHero from "../utils/HeadingHero";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaViber,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import user from "../assets/hero/pic.png";

const Home = () => {
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
          <p className="mt-4 text-white/40 max-w-3xl text-justify">
            I am a passionate web developer with expertise in creating dynamic
            and responsive websites. With a strong foundation in both frontend
            and backend technologies, I strive to deliver seamless user
            experiences and innovative solutions. Let's collaborate to bring
            your ideas to life!
          </p>

          <div className="flex gap-3 justify-center md:justify-start mt-4 text-white/40">
            <a
              href=""
              className="p-2 border border-[#0A63BC] text-[#298bec]  backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
            >
              {" "}
              <FaFacebook />
            </a>
            <a
              href=""
              className="p-2 border border-gray-600 text-[#298bec]  backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
            >
              {" "}
              <FaGithub />
            </a>

            <a
              href=""
              className="p-2 border border-[#E1306C] text-[#E1306C] backdrop-blur-md rounded-full hover:bg-[#E1306C] transition-colors cursor-pointer hover:text-white"
            >
              <FaInstagram />
            </a>

            <a
              href=""
              className="p-2 border border-[#0A63BC] text-[#298bec] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
            >
              {" "}
              <FaLinkedin />
            </a>

            <a
              href=""
              className="p-2 border border-[#46C254] text-[#46C254] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
            >
              {" "}
              <BsWhatsapp />
            </a>

            <a
              href=""
              className="p-2 border border-[#7360F2] text-[#7360F2] backdrop-blur-md rounded-full hover:bg-[#7360F2] transition-colors cursor-pointer hover:text-white"
            >
              <FaViber />
            </a>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-700 text-white hover:opacity-90 transition-opacity
            "
            >
              {" "}
              View my Work
            </button>

            <button
              className="px-6 py-2 rounded-full bg-white/10 text-white hover:opacity-90 transition-opacity
            cursor-pointer hover:bg-teal-700 "
            >
              {" "}
              Download CV
            </button>
          </div>
        </div>

        <div className="flex-1 mt-10 md:mt-0 flex justify-center md:justify-end relative">
          {/* Main Circle with Image */}
          <div className="w-80 h-80 md:w-110 md:h-110 rounded-full overflow-hidden border-2  border-white/20 hover:border-teal-500 transition-all duration-500 group">
            <img
              src={user}
              alt="Hero"
              className="w-full h-full md:h-116 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
