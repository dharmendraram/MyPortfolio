import React from "react";
import { useExperience } from "../context/ExperienceContext";
import { useTheme } from "../context/ThemeContext";
import {
  LuBriefcase,
  LuCalendar,
  LuBuilding2,
  LuGraduationCap,
} from "react-icons/lu";

const Experience = () => {
  const { isDark } = useTheme();
  const { experiences } = useExperience();

  return (
    <section
      id="experience"
      className="relative py-12 sm:py-16 md:py-20 lg:py-10 border-t border-slate-200/60 dark:border-white/10 overflow-hidden"
    >
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <div className="font-mono text-[10px] sm:text-xs text-gray-500 mb-2">
            <span className="text-teal-400">$</span>{" "}
            <span className="text-cyan-400">cat</span> experience.json
          </div>
          <h2 className={`font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Engineering journey &{" "}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              academic track.
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-xl ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
            A chronological record of professional software engineering roles, enterprise systems delivery, and academic foundation.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 lg:pl-12 border-l-2 border-teal-500/30 space-y-12 ml-4 sm:ml-8 lg:ml-12">
          {experiences.map((exp, index) => {
            const isEducation =
              exp.title?.toLowerCase().includes("bachelor") ||
              exp.title?.toLowerCase().includes("bca") ||
              exp.company?.toLowerCase().includes("college") ||
              exp.company?.toLowerCase().includes("university");

            const isCurrent = exp.period?.toLowerCase().includes("present");

            return (
              <div key={exp.id || index} className="relative group">
                {/* Timeline Marker Node */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] lg:-left-[55px] top-1.5 w-10 h-10 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-md ${
                    isCurrent
                      ? "bg-teal-500 border-teal-400 text-white shadow-teal-500/30 ring-4 ring-teal-500/20"
                      : isDark
                      ? "bg-[#141822] border-white/20 text-teal-400 group-hover:border-teal-400"
                      : "bg-white border-slate-300 text-teal-600 group-hover:border-teal-500 shadow-slate-200"
                  }`}
                >
                  {isEducation ? (
                    <LuGraduationCap className="text-lg" />
                  ) : (
                    <LuBriefcase className="text-lg" />
                  )}
                </div>

                {/* Main Card */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl group-hover:shadow-xl ${
                    isDark
                      ? "bg-white/[0.02] border-white/10 group-hover:border-teal-500/40 shadow-black/20"
                      : "bg-white border-slate-200 group-hover:border-teal-500/40 shadow-slate-200/60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      {/* Company/Org Logo */}
                      {exp.logo && (
                        <div className="w-12 h-12 rounded-2xl overflow-hidden p-1.5 shrink-0 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                            <LuBuilding2 className="text-xs" />
                            {exp.company}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold self-start shrink-0 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10">
                      <LuCalendar className="text-teal-500 text-xs" />
                      <span>{exp.period}</span>
                      {isCurrent && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-5 ${
                      isDark ? "text-neutral-300" : "text-slate-600"
                    }`}
                  >
                    {exp.description}
                  </p>

                  {/* Skills/Technologies Micro-badges */}
                  {Array.isArray(exp.skills) && exp.skills.length > 0 && (
                    <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                              isDark
                                ? "bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08] border border-white/10"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer terminal line */}
      <div className={`px-4 sm:px-6 md:px-8 lg:px-20  mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 border-t ${isDark ? "border-white/10" : "border-slate-200/60"}`}>
        <div className={`font-mono text-[10px] sm:text-xs flex flex-wrap items-center gap-1.5 sm:gap-2 ${isDark ? "text-gray-600" : "text-slate-400"}`}>
          <span className="text-teal-400">$</span>
          <span className="text-cyan-400">./timeline.sh</span>
          <span className="hidden sm:inline">--sort=desc</span>
          <span className={`hidden sm:inline ${isDark ? "text-gray-700" : "text-slate-300"}`}>|</span>
          <span className="hidden sm:inline text-teal-400">grep</span>
          <span className="hidden sm:inline">&quot;role=engineer&quot;</span>
          <span className="animate-pulse text-teal-400">_</span>
        </div>
      </div>
    </section>
  );
};

export default Experience;
