import React, { useEffect, useState } from "react";
import { navItems } from "../data/data.jsx";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isActive, setOnActive] = useState("home");
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";
      sections.forEach((section)=>{
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if(window.pageYOffset >= sectionTop - 200 &&window.pageYOffset < sectionTop + sectionHeight - 200){
          currentSection = section.id;
        }
      })
      setOnActive(currentSection);
  
    }
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    setOnActive(id);
    if (element) {
      const navbarHeight = document.querySelector("nav")?.clientHeight || 0;
      window.scrollTo({
        top: element.offsetTop - navbarHeight - 20,
        behavior: "smooth",
      })
      
    }
  }
  // fixed bottom-4 left-1/2 py-1 transform -translate-x-1/2 z-50 lg:w-1/4 md:w-1/2 sm:1-1/2 w-10/12 bg-white/10 border border-white/20 rounded-full flex justify-center shadow-xl transition-all
  return (
    <nav aria-label="Primary navigation" className={`fixed 
             bottom-4 left-1/2 -translate-x-1/2 z-50 p-1.5
             lg:top-5 lg:bottom-auto lg:left-auto lg:right-6 lg:translate-x-0
             w-[min(92%,420px)] lg:w-auto
             rounded-full flex justify-center shadow-2xl backdrop-blur-xl transition-all ${
               isDark 
                 ? 'bg-[#181818]/80 border border-white/15' 
                 : 'bg-white/85 border border-gray-900/10'
             }`}>
      <ul className={`w-full flex justify-around items-center ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {navItems.map((item, index) => (
          <li
            key={item.id || index}
            className="cursor-pointer hover:text-white/100 transition-all"
          >
            <button onClick={() => handleClick(item.id)}
              className={`flex items-center justify-center gap-2 cursor-pointer px-3 h-10 rounded-full transition-all duration-300 ${
                isActive === item.id
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                  : isDark 
                    ? "hover:bg-white/10 text-neutral-300" 
                    : "hover:bg-gray-900/5 text-gray-600"
              }`} title={item.title}
            >
              <span className="text-base">{item.icon}</span>
              <span className="hidden lg:inline text-xs font-semibold uppercase tracking-wider">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
