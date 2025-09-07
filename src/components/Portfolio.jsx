import React from "react";
import { portfolioItems } from "../data/data";
import { div } from "framer-motion/client";
const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="py-5 px-6 border-t-1 border-[#555]"
    >
      <div className="mx-auto container">
        <h2 className="text-3xl font-bold text-center text-neutral-300 mb-3">
          My <span className="text-outline">Portfolio</span>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-5">
          A showcase of my projects, highlighting my skills and expertise in web
          development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20 transition-transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-neutral-200 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-white/20">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
            <button className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-lg text-white text-sm cursor-pointer border border-white/20 hover:bg-white/30">View More Project</button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
