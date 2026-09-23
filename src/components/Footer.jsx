import React from "react";
import { useTheme } from "../context/ThemeContext";
import { LuLock, LuArrowUp, LuHeart } from "react-icons/lu";
import logoWhite from "../assets/logowhite.png";
import logoDark from "../assets/logodark.png";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Footer = ({ onNavigateToAdmin }) => {
  const { isDark } = useTheme();
  const [footerRef, footerVisible] = useScrollReveal(0.05);

  const handleAdminClick = () => {
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    } else {
      window.location.hash = "#admin";
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    <footer
      ref={footerRef}
      className={`border-t transition-all duration-700 ease-out ${
        footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${
        isDark
          ? "border-white/10 bg-[#090b0f] text-neutral-400"
          : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-5 border-b border-slate-200/60 dark:border-white/10">
          {/* Brand Col */}
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center p-1 bg-teal-500/10 border border-teal-500/20">
              <img
                src={isDark ? logoWhite : logoDark}
                alt="Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 dark:text-white block">
                Dharmendra Kumar Ram
              </span>
              <span className="text-xs text-teal-600 dark:text-teal-400 font-medium block">
                Full-Stack Engineer · NIRC Nepal
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "portfolio", label: "Portfolio" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="hover:text-teal-500 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isDark
                ? "bg-white/5 border-white/10 hover:border-teal-400 hover:text-white"
                : "bg-white border-slate-200 hover:border-teal-500 hover:text-slate-900 shadow-sm"
            }`}
          >
            <span>Back to top</span>
            <LuArrowUp className="text-sm text-teal-500" />
          </button>
        </div>

        {/* Bottom copyright & admin */}
        <div className="pb-20 pt-2 sm:py-2 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-500 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Dharmendra Kumar Ram. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Kathmandu, Nepal</span>
            </span>

            <button
              type="button"
              onClick={handleAdminClick}
              className="p-1.5 rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-white/20 hover:text-teal-500 transition-all cursor-pointer"
              title="Admin Portal Login"
              aria-label="Admin Portal Login"
            >
              <LuLock className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
