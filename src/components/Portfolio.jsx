import React, { useState } from "react";
import { portfolioItems } from "../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
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
    <section id="portfolio" className="py-5 px-6 border-t-1 border-[#555]">
      <div className="mx-auto container">
        <h2 className="text-3xl font-bold text-center text-neutral-300 mb-3">
          My <span className="text-outline">Portfolio</span>
        </h2>
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-5">
          A showcase of my projects, highlighting my skills and expertise in web
          development.
        </p>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={7000}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {portfolioItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCardClick(item)}
                className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-white/20 transition-transform hover:-translate-y-1 cursor-pointer"
              >
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
                  <p className="text-sm text-white/50">{item.category}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Popup Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-lg max-w-lg w-full p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-1 right-1 text-white/90 bg-red-700 hover:text-red-700 hover:bg-white hover:border-white cursor-pointer text-2xl border border-red-700 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <div className="py-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                Category: {selectedItem.category}
              </p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {selectedItem.description ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>

              {selectedItem.link && (
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-6 py-2 bg-teal-700 hover:bg-teal-900 text-white rounded-sm text-sm"
                >
                  Visit Project
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
