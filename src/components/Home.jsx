import React, { useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import HeadingHero from "../utils/HeadingHero";
import { useTheme } from "../context/ThemeContext";
import user from "../assets/hero/pic3.png";
import { downloadCV } from "../utils/generateCV";
import {
  LuDownload,
  LuArrowRight,
  LuMail,
  LuSparkles,
  LuBriefcase,
  LuGraduationCap,

  LuFolderGit2,
} from "react-icons/lu";

const ImageWithGlow = ({ user }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center group"
    >
      {/* Keep both hover glows clipped inside the outer ring. */}
      <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.5) 0%, rgba(6,182,212,0.3) 40%, transparent 70%)",
          }}
        />

        {isHovered && (
          <div
            className="absolute w-48 h-48 rounded-full bg-teal-400/30 blur-xl transition-opacity duration-300"
            style={{
              top: position.y - 104,
              left: position.x - 104,
            }}
          />
        )}
      </div>

      {/* Orbital decorative ring */}
      <div className="absolute inset-2 rounded-full border border-dashed border-teal-500/30 animate-[spin_35s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-6 rounded-full border border-teal-500/20 pointer-events-none" />

      {/* Main Avatar Container */}
      <div className="relative z-10 w-64 h-64 sm:w-76 sm:h-76 md:w-84 md:h-84 lg:w-92 lg:h-92 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-teal-500/40 via-cyan-500/20 to-blue-500/40 shadow-2xl backdrop-blur-sm">
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
          <img
            src={user}
            alt="Dharmendra Kumar Ram"
            loading="eager"
            className="w-full h-full object-cover object-top transition duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>


      <div className="absolute top-4 -right-2 z-20 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md bg-white/80 dark:bg-[#12161f]/90 border border-cyan-500/30 shadow-lg shadow-black/10">
        <span className="text-sm font-semibold tracking-tight text-slate-800 dark:text-neutral-200">
          2+ Yrs Experience
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  const { isDark } = useTheme();

  const [heroRef, heroVisible] = useScrollReveal(0.15);
  const [statsRef, statsVisible] = useScrollReveal(0.15);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 72;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-center pt-8 pb-10  overflow-hidden"
    >
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={heroRef}
          className={`flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 transition-all duration-700 ease-out ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left Narrative Column */}
          <div className="flex-1 text-center lg:text-left">
            
            {/* Main Greeting & Name */}
            <div className="font-mono text-[10px] sm:text-xs text-gray-500 mb-2">
              <span className="text-teal-400">$</span>{" "}
              <span className="text-cyan-400">whoami</span>
            </div>
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              Dharmendra{" "}
              <span className="text-teal-500 dark:text-teal-400">Kumar Ram</span>
            </h1>

            {/* Dynamic Role Subheading */}
            <div className="mb-5">
              <HeadingHero />
            </div>

            {/* Impact Statement */}
            <p
              className={`max-w-2xl text-base sm:text-lg leading-relaxed mb-8 mx-auto lg:mx-0 ${
                isDark ? "text-neutral-300/90" : "text-slate-600"
              }`}
            >
              Full-Stack Developer at{" "}
              <span className="font-semibold text-teal-500 dark:text-teal-400">
                National Incubation &amp; Research Center (NIRC)
              </span>
              . Architecting robust, scalable web applications, enterprise healthcare systems, government platforms, and performant user interfaces with modern full-stack technologies.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                type="button"
                onClick={() => scrollToSection("portfolio")}
                className="group px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 text-white font-medium text-sm shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40  active:scale-[0.98] transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Selected Work</span>
                <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={downloadCV}
                className={`px-5 py-3 rounded-xl font-medium text-sm border backdrop-blur-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? "bg-white/[0.04] hover:bg-white/[0.09] text-white border-white/10 hover:border-teal-500/40 shadow-sm shadow-black/20"
                    : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-teal-500/40 shadow-sm"
                }`}
              >
                <LuDownload className="text-teal-500 text-base" />
                <span>Download Resume (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className={`px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? "text-neutral-300 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <LuMail className="text-base text-cyan-400" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

          {/* Right Visual Portrait */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <ImageWithGlow user={user} />
          </div>
        </div>

        {/* High-Impact Hero Stats Strip */}
        <div
          ref={statsRef}
          className={`mt-14 pt-10 border-t border-slate-200/60 dark:border-white/10 transition-all duration-700 ease-out delay-200 ${
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-white/[0.02] border-white/10 hover:border-teal-500/40"
                  : "bg-white/80 border-slate-200/80 hover:border-teal-500/40 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <LuFolderGit2 className="text-lg" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  11+
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-neutral-200">
                Live Platforms
              </p>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                Government, healthcare & web apps
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-white/[0.02] border-white/10 hover:border-teal-500/40"
                  : "bg-white/80 border-slate-200/80 hover:border-teal-500/40 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <LuBriefcase className="text-lg" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  2+ Yrs
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-neutral-200">
                Industry Experience
              </p>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                Full-stack engineering at NIRC
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-white/[0.02] border-white/10 hover:border-teal-500/40"
                  : "bg-white/80 border-slate-200/80 hover:border-teal-500/40 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <LuGraduationCap className="text-lg" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  BCA
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-neutral-200">
                Tribhuvan University
              </p>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                Bachelor in Computer Application
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-white/[0.02] border-white/10 hover:border-teal-500/40"
                  : "bg-white/80 border-slate-200/80 hover:border-teal-500/40 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  100%
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-neutral-200">
                Client Reliability
              </p>
              <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                Clean code & scalable architectures
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer terminal line */}
      <div className={`px-4 sm:px-6 md:px-8 lg:px-12 mt-4 pt-4 border-t ${isDark ? "border-white/10" : "border-slate-200/60"}`}>
        <div className={`font-mono text-[10px] sm:text-xs flex flex-wrap items-center gap-1.5 sm:gap-2 ${isDark ? "text-gray-600" : "text-slate-400"}`}>
          <span className="text-teal-400">$</span>
          <span className="text-cyan-400">./init_portfolio.sh</span>
          <span className="hidden sm:inline">--mode=fullstack</span>
          <span className={`hidden sm:inline ${isDark ? "text-gray-700" : "text-slate-300"}`}>|</span>
          <span className="hidden sm:inline text-teal-400">grep</span>
          <span className="hidden sm:inline">&quot;status=available&quot;</span>
          <span className="animate-pulse text-teal-400">_</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
