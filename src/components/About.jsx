import React from "react";
import { useTheme } from "../context/ThemeContext";
import user from "../assets/about/pic2.png";
import { downloadCV } from "../utils/generateCV";
import { LuDownload, LuMapPin, LuCircleCheck } from "react-icons/lu";
import { useScrollReveal } from "../hooks/useScrollReveal";

const About = () => {
  const { isDark } = useTheme();

  const [headerRef, headerVisible] = useScrollReveal(0.1);
  const [leftRef, leftVisible] = useScrollReveal(0.1);
  const [rightRef, rightVisible] = useScrollReveal(0.1);

  const bio1 = "I am Dharmendra Kumar Ram, a Full-Stack Software Developer currently engineering enterprise and public sector web platforms at the National Incubation & Research Center (NIRC) in Nepal.";
  const bio2 = "With a Bachelor's in Computer Application (BCA) from Tribhuvan University, I combine a rigorous foundation in computer science with modern engineering practices. Over the past several years, I have architected and delivered mission-critical applications including the Hospital Management System (Hamro HMS), the Government With People (GWP) citizen portal, Rakmina Recruitment, and provincial training portals.";
  const bio3 = "My approach focuses on clean code, testable architectures, performant relational database schemas (MySQL & PostgreSQL), secure authentication pipelines, and fluid UI experiences built with React, TypeScript, and modern CSS tooling.";

  const corePillars = [
    { title: "Government & Civic Platforms", desc: "Built digital platforms for governance and provincial research organizations." },
    { title: "Hospital Management Systems (HMS)", desc: "Led development of Hamro HMS handling patient registration, records, and operations." },
    { title: "Enterprise Backend & REST APIs", desc: "Architected high-throughput relational databases with Django, Grails, and PostgreSQL." },
    { title: "Modern Reactive Frontends", desc: "Engineered scalable single-page apps using React, TypeScript, and modern state architecture." },
  ];

  return (
    <section
      id="about"
      className="relative py-6 sm:py-6 md:py-6 lg:py-12 border-t border-slate-200/60 dark:border-white/10 overflow-hidden"
    >
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-10 sm:mb-12 md:mb-16 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="font-mono text-[10px] sm:text-xs text-gray-500 mb-2">
            <span className="text-teal-400">$</span>{" "}
            <span className="text-cyan-400">cat</span> about.json
          </div>
          <h2 className={`font-mono text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Engineering with{" "}
            <span className="text-teal-500 dark:text-teal-400">
              precision & purpose.
            </span>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl ${isDark ? "text-neutral-400" : "text-slate-600"}`}>
            A closer look into my engineering background, core competencies, and journey as a software developer.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-5 items-center">
          {/* Left Column */}
          <div
            ref={leftRef}
            className={`lg:col-span-4 flex flex-col items-center lg:items-start transition-all duration-700 ease-out delay-100 ${
              leftVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div
              className={`w-full max-w-md p-4 sm:p-5 rounded-3xl border backdrop-blur-xl transition-all duration-300 shadow-xl ${
                isDark
                  ? "bg-white/[0.02] border-white/10 shadow-black/40"
                  : "bg-white border-slate-200/80 shadow-slate-200/50"
              }`}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 mb-4 group">
                <img
                  src={user}
                  alt="Dharmendra Kumar Ram"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl backdrop-blur-md bg-black/60 border border-white/15 text-white text-xs">
                  <div className="flex items-center gap-2">
                    <LuMapPin className="text-teal-400 text-sm" />
                    <span className="font-medium">Kathmandu, Nepal</span>
                  </div>
                  <span className="text-[11px] text-teal-300 font-mono">BCA · TU</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/20">Full-Stack Developer</span>
                <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20">NIRC Nepal</span>
                <span className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20">React · Django · Grails</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightRef}
            className={`lg:col-span-8 transition-all duration-700 ease-out delay-200 ${
              rightVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Transforming complex business logic into dependable digital infrastructure.
            </h3>

            <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${isDark ? "text-neutral-300" : "text-slate-600"}`}>
              <p>
                {bio1}
              </p>
              <p>
                {bio2}
              </p>
              <p>
                {bio3}
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 mb-8">
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    isDark
                      ? "bg-white/[0.02] border-white/10 hover:border-teal-500/30"
                      : "bg-white border-slate-200 hover:border-teal-500/30 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <LuCircleCheck className="text-teal-500 text-sm shrink-0" />
                    <h4 className="text-xs font-bold text-slate-800 dark:text-neutral-100">{pillar.title}</h4>
                  </div>
                  <p className="text-[12px] text-slate-500 dark:text-neutral-400 leading-snug">{pillar.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={downloadCV}
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-medium text-xs sm:text-sm shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LuDownload className="text-sm" />
                <span>Download Curriculum Vitae</span>
              </button>
              <button
                type="button"
                onClick={() => { const el = document.getElementById("experience"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isDark
                    ? "border-white/15 text-neutral-300 hover:text-white hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                View Professional Timeline &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer terminal line */}
      <div className={`px-4 sm:px-6 md:px-8 lg:px-14 mt-4 sm:mt-4 md:mt-6 pt-4 sm:pt-6 border-t ${isDark ? "border-white/10" : "border-slate-200/60"}`}>
        <div className={`font-mono text-[10px] sm:text-xs flex flex-wrap items-center gap-1.5 sm:gap-2 ${isDark ? "text-gray-600" : "text-slate-400"}`}>
          <span className="text-teal-400">$</span>
          <span className="text-cyan-400">./load_profile.sh</span>
          <span className="hidden sm:inline">--section=about</span>
          <span className={`hidden sm:inline ${isDark ? "text-gray-700" : "text-slate-300"}`}>|</span>
          <span className="hidden sm:inline text-teal-400">grep</span>
          <span className="hidden sm:inline">&quot;developer&quot;</span>
          <span className="animate-pulse text-teal-400">_</span>
        </div>
      </div>
    </section>
  );
};

export default About;
