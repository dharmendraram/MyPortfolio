import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import * as FramerMotion from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "swiper/css";
import "swiper/css/navigation";

const FilmHoles = ({ frameNumber, bottom = false }) => (
  <div className="film-holes" aria-hidden="true">
    {Array.from({ length: 6 }).map((_, index) => (
      <span className="film-hole" key={index} />
    ))}
    <span className={`film-frame-number ${bottom ? "film-frame-number--bottom" : ""}`}>
      {String(frameNumber).padStart(2, "0")}
    </span>
  </div>
);

const Portfolio = () => {
  const { projects: portfolioItems } = usePortfolio();
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
        <h2
          className={`text-3xl font-bold text-center mb-3 ${
            isDark ? "text-neutral-300" : "text-gray-700"
          }`}
        >
          Selected <span className="text-outline">Work</span>
        </h2>
        <p
          className={`text-center max-w-2xl mx-auto mb-8 ${
            isDark ? "text-neutral-400" : "text-gray-600"
          }`}
        >
          A curated selection of digital products, platforms, and experiences I’ve helped bring to life.
        </p>

        {/* Cinematic film-reel carousel */}
        <div className={`portfolio-reel ${isDark ? "portfolio-reel--dark" : "portfolio-reel--light"}`}>
          <div className="portfolio-reel-fade portfolio-reel-fade--left" />
          <div className="portfolio-reel-fade portfolio-reel-fade--right" />

          <button className="portfolio-reel-nav portfolio-reel-prev" aria-label="Previous project">
            <span aria-hidden="true">&#8249;</span>
          </button>
          <button className="portfolio-reel-nav portfolio-reel-next" aria-label="Next project">
            <span aria-hidden="true">&#8250;</span>
          </button>

          <Swiper
            className="portfolio-reel-swiper"
            modules={[Autoplay, Navigation]}
            slidesPerView="auto"
            centeredSlides
            loop
            grabCursor
            slideToClickedSlide
            navigation={{
              prevEl: ".portfolio-reel-prev",
              nextEl: ".portfolio-reel-next",
            }}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide key={item.title}>
                <button
                  type="button"
                  onClick={() => handleCardClick(item)}
                  className="film-frame"
                  aria-label={`Open ${item.title} project details`}
                >
                  <FilmHoles frameNumber={index + 1} />
                  <div className="film-image-wrap">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="film-vignette" />
                    <span className="film-scene-label">
                      Project {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="film-project-info">
                      <span>{item.company}</span>
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                    </div>
                  </div>
                  <FilmHoles frameNumber={index + 1} bottom />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Popup Modal */}
      <FramerMotion.AnimatePresence>
        {selectedItem && (
          <FramerMotion.motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FramerMotion.motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`rounded-lg max-w-6xl w-full p-6 relative shadow-xl border ${
                isDark
                  ? "bg-neutral-900 border-white/10"
                  : "bg-white border-gray-900/10"
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
                      loading="lazy"
                      className="w-full h-full object-fill rounded-md"
                    />
                  </div>

                  {/* Content - Bottom on mobile, Left on desktop */}
                  <div className="order-2 md:order-1">
                      <div className="flex items-center justify-between mb-2 me-2">
                  
                    {selectedItem.company === "Company" ? (
                      <span className="text-xs px-2 py-1.5 rounded-md bg-yellow-700 text-white">
                        {selectedItem.company}
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1.5 rounded-md bg-green-500/20 text-green-600">
                        {selectedItem.company}
                      </span>
                    )}
                      <div className="flex items-center gap-1">
                      {selectedItem.username && (
                      <p
                        className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}
                      >
                        User: {selectedItem.username}
                      </p>
                    )}

                    {selectedItem.password && (
                      <p
                        className={`text-xs ${isDark ? "text-white/70" : "text-gray-600"}`}
                      >
                        Pw: {selectedItem.password}
                      </p>
                    )}
                    </div>
                  </div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {selectedItem.title}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Category: {selectedItem.category}
                    </p>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed mb-4 ${
                        isDark ? "text-neutral-300" : "text-gray-700"
                      }`}
                    >
                      {selectedItem.description ||
                        "A detailed description of this project will be added soon."}
                    </p>

                    {/* Technologies */}
                    {selectedItem.technology && (
                      <div className="mb-4">
                        <h4
                          className={`font-semibold mb-2 text-sm ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.technology.map((tech, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded-md ${
                                isDark
                                  ? "bg-white/10 border border-white/20 text-gray-300"
                                  : "bg-gray-900/10 border border-gray-900/20 text-gray-700"
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
                              ? "border-white/30 hover:bg-white/20 text-white"
                              : "border-gray-900/30 hover:bg-gray-900/20 text-gray-900"
                          }`}
                        >
                          View On Github
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FramerMotion.motion.div>
          </FramerMotion.motion.div>
        )}
      </FramerMotion.AnimatePresence>
    </section>
  );
};

export default Portfolio;
