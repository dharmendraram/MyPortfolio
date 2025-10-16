import React, { useState } from "react";
import { portfolioItems } from "../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState(null);

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
        <h2 className="text-3xl font-bold text-center text-neutral-300 mb-3">
          My <span className="text-outline">Portfolio</span>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-8">
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
                className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20 cursor-pointer transition-all h-72 flex flex-col"
              >
                <div className="h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-fill object-center transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 flex-1 flex flex-col justify-center  text-center">
                  <h3 className="text-sm font-semibold text-neutral-200 mb-0 pb-0 ">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/50 mt-0">{item.category}</p>
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
              className="bg-neutral-900 rounded-lg max-w-6xl w-full p-6 relative shadow-xl border border-white/10"
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
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedItem.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Category: {selectedItem.category}
                    </p>

                    {/* Description */}
                    <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                      {selectedItem.description ||
                        "A detailed description of this project will be added soon."}
                    </p>

                    {/* Technologies */}
                    {selectedItem.technology && (
                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2 text-sm">
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.technology.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-white/10 border border-white/20 px-2 py-1 rounded-md text-gray-300"
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
                          className="px-5 py-2 border border-white/30 hover:bg-white/20 text-white rounded-sm text-sm transition"
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
