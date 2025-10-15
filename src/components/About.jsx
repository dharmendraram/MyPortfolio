import React, { Fragment } from "react";
import GridLine from "../utils/GridLine";

import user from "../assets/about/pic2.png";

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full border border-[rgba(102,102,102,0.3)] text-white flex justify-center items-center py-5 overflow-hidden"
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-30 py-25 md:py-3 max-w-5xl w-full md:max-w-6xl">
        {/* Image - Left */}
        <div className="relative w-55 h-55 group ">
          <img
            src={user}
            className="w-full h-full object-cover rounded-xl group-hover:grayscale transition duration-500"
            alt="User"
          />
          <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-blue-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-0 transition-all duration-500 group-hover:scale-110 group-hover:border-neutral-300"></div>

          <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-pink-500 transform -translate-x-1/2 -translate-y-1/2 rotate-0 z-0 transition-all duration-500 group-hover:scale-110 group-hover:border-neutral-300"></div>
        </div>

        {/* About Content - Right */}
        <div className="flex-1 px-4">
          <h2 className="text-3xl font-bold mb-4 w-fit border-b-2 border-neutral-500 ">
            About <span className="text-outline">Me</span>
          </h2>
          <p className="text-neutral-300 mb-8 text-sm text-justify">
            I’m Dharmendra Kumar Ram, a passionate Full-Stack Developer who
            loves turning ideas into interactive, user-friendly applications.
            From crafting responsive interfaces to building scalable backends, I
            focus on creating digital experiences that are both functional and
            engaging.
          </p>

          <p className="text-neutral-300 mb-8 text-normal text-justify">
            I work with modern technologies like React.js, TypeScript, Node.js,
            Tailwind CSS, MySQL, Python & Django, and Java Grails. I enjoy
            collaborating with teams, solving complex problems, and delivering
            solutions that bring real value to users while staying clean,
            efficient, and future-ready.
          </p>

          <button className="px-6 py-2 border border-neutral-400 rounded-full cursor-pointer hover:bg-white transition hover:text-neutral-700">
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
