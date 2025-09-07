import React, { useEffect, useState } from "react";
import { navItems } from "../data/data.jsx";

const Navbar = () => {
  const [isActive, setOnActive] = useState("home");

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
    <div className="fixed 
             bottom-4 left-1/2 
             transform -translate-x-1/2 
             z-50  py-1
             lg:top-4 lg:bottom-auto  
             lg:w-1/4 md:w-1/2 sm:w-1/2 w-10/12 
             bg-white/10 border border-white/20  
             rounded-full flex justify-center shadow-xl transition-all">
      <ul className="w-full flex justify-around items-center text-white">
        {navItems.map((item, index) => (
          <li
            key={item.id || index}
            className="cursor-pointer hover:text-white/100 transition-all"
          >
            <button onClick={() => handleClick(item.id)}
              className={`flex items-center justify-center cursor-pointer p-3 h-10 w-10 rounded-full transition-all duration-300 ${
                isActive === item.id
                  ? "bg-teal-500/30 text-teal-300"
                  : "bg-white/10 hover:bg-white/30"
              }`} title={item.title}
            >
              {item.icon}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
