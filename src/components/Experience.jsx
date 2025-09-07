import React from "react";
import { experiences } from "../data/data";
import { span } from "framer-motion/client";



const Experience = () => {
  return (
    <section
      id="experience"
      className="py-5 relative border-t-1 border-[#555555]"
    >
      <h2 className="text-3xl font-bold text-center text-neutral-300">
        My <span className="text-outline">Experience</span>
      </h2>
      <p className="text-neutral-400 text-center max-w-xl mx-auto mb-5">
        A journey through my professional milestones and achievements.
      </p>

      <div className="relative max-w-5xl mx-auto px-4 py-5">
        <div className="absolute left-1/2 md:left-1/2 top-0 bottom-0 w-1 md:flex hidden bg-teal-800 transform -translate-x-1/2"></div>
        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={` relative flex items-start w-full ${
                  isLeft ? " md:justify-start " : "md:justify-end"
                } justify-center`}
              >
                <div className="absolute left-1/2 md:flex hidden -translate-x-1/2 z-10">
                  <div className="w-15 h-15 rounded-full shadow-lg flex justify-center items-center bg-neutral-600">
                    <img src={exp.logo} alt="logo"  className="w-full h-fit"/>
                  </div>
                </div>

                <div
                  className={`w-full md:w-[45%] p-6 rounded-xl shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 ${
                    isLeft ? "md:text-right md:mr-12" : "md:ml-12"
                  } text-left`}
                >
                  <h3 className="text-xl font-semibold text-neutral-100">
                    {exp.title}
                  </h3>
                  <p className="text-teal-500 font-medium">{exp.company}</p>
                  <span className="text-sm text-white/50">{exp.period}</span>
                  <p className="text-neutral-400 text-justify text-sm mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:justify-end justify-start">
                    {exp.skills.map((skill, index) => (
                      <span className="px-3 py-1 border border-[#555] text-white/70 rounded-md text-sm text-light" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
