import React, { useState } from "react";
import { portfolioItems } from "../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "swiper/css";

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isDark } = useTheme();

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <section id="portfolio" className="py-10 px-6 border-t border-[#444]">
      <div className="mx-auto container">
        {/* Section Title */}
        <h2 className={`text-3xl font-bold text-center mb-3 ${
          isDark ? 'text-neutral-300' : 'text-gray-700'
        }`}>
          My <span className="text-outline">Portfolio</span>
        </h2>
        <p className={`text-center max-w-2xl mx-auto mb-8 ${
          isDark ? 'text-neutral-400' : 'text-gray-600'
        }`}>
          A showcase of my projects, highlighting my skills and expertise in web
          development.
        </p>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={7000}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
        >
          {portfolioItems.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                onClick={() => handleCardClick(item)}
                className={`backdrop-blur-lg rounded-lg overflow-hidden border cursor-pointer transition-all h-72 flex flex-col ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-gray-900/10 border-gray-900/20'
                }`}
              >
                <div className="h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-fill object-center transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 flex-1 flex flex-col justify-center  text-center">
                  <h3 className={`text-sm font-semibold mb-0 pb-0 ${
                    isDark ? 'text-neutral-200' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm mt-0 ${
                    isDark ? 'text-white/50' : 'text-gray-600'
                  }`}>{item.category}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`rounded-lg max-w-6xl w-full p-6 relative shadow-xl border ${
                isDark 
                  ? 'bg-neutral-900 border-white/10' 
                  : 'bg-white border-gray-900/10'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-white/90 bg-red-700 hover:text-red-700 hover:bg-white hover:border-white cursor-pointer text-2xl border border-red-700 rounded-full w-8 h-8 flex items-center justify-center"
              >
                &times;
              </button>
              {/* Modal Content */}
              <div className="py-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image - Top on mobile, Right on desktop */}
                  <div className="order-1 md:order-2">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-fill rounded-md"
                    />
                  </div>

                  {/* Content - Bottom on mobile, Left on desktop */}
                  <div className="order-2 md:order-1">
                    <h3 className={`text-2xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {selectedItem.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Category: {selectedItem.category}
                    </p>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-neutral-300' : 'text-gray-700'
                    }`}>
                      {selectedItem.description ||
                        "A detailed description of this project will be added soon."}
                    </p>

                    {/* Technologies */}
                    {selectedItem.technology && (
                      <div className="mb-4">
                        <h4 className={`font-semibold mb-2 text-sm ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.technology.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded-md ${
                                isDark 
                                  ? 'bg-white/10 border border-white/20 text-gray-300' 
                                  : 'bg-gray-900/10 border border-gray-900/20 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-2">
                      {selectedItem.link && (
                        <a
                          href={selectedItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2 bg-teal-700 hover:bg-teal-900 text-white rounded-sm text-sm transition"
                        >
                          Visit Project Demo
                        </a>
                      )}
                      {selectedItem.github && (
                        <a
                          href={selectedItem.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-5 py-2 border rounded-sm text-sm transition ${
                            isDark 
                              ? 'border-white/30 hover:bg-white/20 text-white' 
                              : 'border-gray-900/30 hover:bg-gray-900/20 text-gray-900'
                          }`}
                        >
                          View On Github
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
