import React from "react";
import { skillsData } from "../data/data";
import { LuTerminal, LuDatabase, LuCode, LuWrench, LuLayers } from "react-icons/lu";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categoryIcons = {
  "Backend Development": <LuTerminal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
  "Database & Storage": <LuDatabase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
  "Frontend Development": <LuCode className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
  "DevOps & Deployment": <LuLayers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
  "Tools & Software": <LuWrench className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
};

const SkillBar = ({ item }) => (
  <div className="group/skill">
    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
      <div className="flex items-center gap-2 sm:gap-2.5">
        <div className="transition-all duration-300 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
          {item.icon}
        </div>
        <span className="font-mono text-[11px] sm:text-xs text-gray-300 group-hover/skill:text-white transition-colors">
          {item.name}
        </span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="font-mono text-[9px] sm:text-[10px] text-gray-500">{item.years}</span>
        <span className="font-mono text-[10px] sm:text-xs text-gray-500">{item.level}%</span>
      </div>
    </div>
    <div className="relative h-1 bg-white/5 overflow-hidden">
      <div
        className="absolute h-full bg-teal-500 opacity-50 blur-sm"
        style={{ width: `${item.level}%` }}
      />
      <div
        className="relative h-full bg-teal-500"
        style={{ width: `${item.level}%` }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [headerRef, headerVisible] = useScrollReveal(0.1);
  const [gridRef, gridVisible] = useScrollReveal(0.05);

  const subText = "A curated overview of my core technical stack, tools, and proficiency levels across full-stack development.";

  return (
    <section
      id="skills"
      className="relative py-12 sm:py-16 md:py-20 lg:py-10 overflow-hidden"
    >
      {/* Grid lines background */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-teal-500/30 to-transparent" />
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-pink-500/30 to-transparent" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`mb-10 sm:mb-12 md:mb-10 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-mono text-[10px] sm:text-xs text-gray-500 mb-2">
            <span className="text-green-500">$</span>{" "}
            <span className="text-blue-400">cat</span> skills.json
          </div>
          <h2 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Technical{" "}
            <span className="text-teal-500 dark:text-teal-400">
              Skills
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl text-gray-400">
            {subText}
          </p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {skillsData.map((category, i) => (
            <div
              key={category.title}
              style={{ transitionDelay: gridVisible ? `${i * 100}ms` : "0ms" }}
              className={`group relative bg-black border border-white/10 hover:border-blue-500/50 transition-all duration-500 ${
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-4 sm:p-5 md:p-6">
                {/* Card header */}
                <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {categoryIcons[category.title] || <LuCode className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
                    <h3 className="font-mono text-xs sm:text-sm tracking-wider text-white uppercase">
                      {category.title}
                    </h3>
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-gray-500">
                    [{category.skills.length}]
                  </div>
                </div>

                {/* Skill bars */}
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {category.skills.map((item, idx) => (
                    <SkillBar key={idx} item={item} />
                  ))}
                </div>
              </div>

              {/* Card footer */}
              <div className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 border-t border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] sm:text-[10px] text-gray-600 uppercase">
                    {category.title.toLowerCase()}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[9px] sm:text-[10px] text-gray-600">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer terminal line */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-white/10">
          <div className="font-mono text-[10px] sm:text-xs text-gray-600 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-green-500">$</span>
            <span className="text-blue-400">./display_skills.sh</span>
            <span className="hidden sm:inline">--mode=interactive</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="hidden sm:inline text-teal-400">grep</span>
            <span className="hidden sm:inline">&quot;proficiency &gt; 80&quot;</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
