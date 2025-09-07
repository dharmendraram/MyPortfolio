import React from "react";
import { skillsData } from "../data/data";
import { motion } from "framer-motion";
import GridLine from "../utils/GridLine";
const Skills = () => {
  return (
    <section id="skills" className="py-5 relative">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className=" text-3xl font-bold text-center mb-1 text-neutral-300">
          {" "}
          <span className="text-outline">Skills</span>
        </h2>
        <p className="text-neutral-400 text-center max-w-xl mx-auto mb-5">
          The tools and technologies I use to bring idreas to life.
        </p>
        <div className="grid md:grid-cols-2 gap-10">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{
                rotateX: 8,
                rotateY: 8,
                scale: 1.05,
                backgroundColor: "transparent",
                borderColor: "oklch(77.7% 0.152 181.912)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className=" backdrop-blur-lg rounded-lg p-6 shadow-lg border border-white/20"
            >
              <h3 className=" text-3xl font-semibold mb-4 text-teal-400">
                {skill.title}
              </h3>

              <div className="flex flex-wrap gap-4">
                {skill.skills.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{
                      scale: 1.05,
                      rotate: 10,
                      backgroundColor: "transparent",
                      boxShadow: "0 10px 20px rgba(0, 255, 200, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="flex items-center z-20 relative gap-2 py-2 px-3 text-white/50 bg-black/20 backdrop-blur-md rounded-lg cursor-pointer text-sm">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-neutral-300">{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
