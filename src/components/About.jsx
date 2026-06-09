import React, { Fragment } from "react";
import GridLine from "../utils/GridLine";
import { useTheme } from "../context/ThemeContext";

import user from "../assets/about/pic2.png";

const About = () => {
  const { isDark } = useTheme();
  
  return (
    <section
      id="about"
      className={`relative w-full border border-[rgba(102,102,102,0.3)] flex justify-center items-center py-5 overflow-hidden ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-30 py-25 md:py-3 max-w-5xl w-full md:max-w-6xl">
        {/* Image - Left */}
        <div className="relative w-55 h-55 group ">
          <img
            src={user}
            className="w-full h-full object-cover rounded-xl group-hover:grayscale transition duration-500"
            loading="lazy"
            alt="User"
          />
          <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-blue-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-0 transition-all duration-500 group-hover:scale-110 group-hover:border-neutral-300"></div>

          <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-pink-500 transform -translate-x-1/2 -translate-y-1/2 rotate-0 z-0 transition-all duration-500 group-hover:scale-110 group-hover:border-neutral-300"></div>
        </div>

        {/* About Content - Right */}
        <div className="flex-1 px-4">
          <h2 className={`text-3xl font-bold mb-4 w-fit border-b-2 ${
            isDark ? 'border-neutral-500' : 'border-gray-400'
          }`}>
            About <span className="text-outline">Me</span>
          </h2>
          <p className={`mb-8 text-sm text-justify ${
            isDark ? 'text-neutral-300' : 'text-gray-600'
          }`}>
            I’m Dharmendra Kumar Ram, a passionate Full-Stack Developer from Nepal
  with hands-on experience in designing, developing, and deploying modern
  web applications. Over the years, I have worked on government systems,
  healthcare platforms, recruitment portals, startup ecosystems,
  educational platforms, and enterprise solutions. My goal is to build
  technology that simplifies processes, improves user experiences, and
  creates meaningful digital transformation.
          </p>

          <p className={`mb-8 text-normal text-justify ${
            isDark ? 'text-neutral-300' : 'text-gray-600'
          }`}>
             Currently working as a Full-Stack Developer at National Incubation &
  Research Center (NIRC), I contribute to the development of large-scale
  applications using React.js, TypeScript, JavaScript, Python Django,
  Java Grails, MySQL, PostgreSQL, and Tailwind CSS. I have successfully
  delivered projects such as Hospital Management System (HMS),
  Government With People (GWP), Rakmina Recruitment Portal, Provincial
  Research and Training Institute Platform, StartupGhar, KIEC, and
  several business websites. I am continuously learning new technologies
  and enjoy solving complex technical challenges while maintaining clean,
  scalable, and efficient code.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-teal-400">2+</h3>
              <p className="text-sm">Years Experience</p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-teal-400">10+</h3>
              <p className="text-sm">Projects Delivered</p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-teal-400">6+</h3>
              <p className="text-sm">Technologies</p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-teal-400">100%</h3>
              <p className="text-sm">Dedication</p>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default About;
