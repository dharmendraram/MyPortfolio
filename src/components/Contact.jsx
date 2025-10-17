import React, { useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaViber,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { PiPhone } from "react-icons/pi";
import { useTheme } from "../context/ThemeContext";

const Contact = () => {
  const { isDark } = useTheme();
  
  return (
    <section id="contact" className="py-5 px-4 border-t-1 border-[#555]">
      <div className="mx-auto container">
        <h2 className={`text-3xl font-bold text-center mb-3 ${
          isDark ? 'text-neutral-300' : 'text-gray-700'
        }`}>
          Get in <span className="text-outline">Touch</span>
        </h2>
        <p className={`text-center max-w-2xl mx-auto ${
          isDark ? 'text-neutral-400' : 'text-gray-600'
        }`}>
          I'm open to new opportunities and collaborations. Feel free to reach
          out to me via the contact form below or through my social media
          channels.
        </p>

        <div className=" p-4 md:px-4 flex flex-col md:flex-row md:justify-between items-center">
          <div>
            <h3 className={`text-xl font-semibold mb-2 text-center md:text-start px-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Contact Information
            </h3>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-10">
              <div className="flex items-start">
                <div className={`p-3 text-red-400 backdrop-blur-lg rounded-full mr-4 border ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-gray-900/10 border-gray-900/20'
                }`}>
                  <FaLocationArrow />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Location</h4>
                  <p className={isDark ? 'text-neutral-400' : 'text-gray-600'}>Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`p-3 backdrop-blur-lg rounded-full mr-4 border ${
                  isDark 
                    ? 'bg-white/10 text-white border-white/20' 
                    : 'bg-gray-900/10 text-gray-900 border-gray-900/20'
                }`}>
                  <MdEmail />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>E-mail</h4>
                  <p className={isDark ? 'text-neutral-400' : 'text-gray-600'}>
                    <a href="mailto:dharmendraram7852@gmail.com">
                      dharmendraram7852@gmail.com
                    </a>
                    ,{" "}
                    <a href="mailto:dev.dharmendra.ram@gmail.com">
                      dev.dharmendra.ram@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`p-3 text-red-400 backdrop-blur-lg rounded-full mr-4 border ${
                  isDark 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-gray-900/10 border-gray-900/20'
                }`}>
                  <PiPhone />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Phone</h4>
                  <p className={isDark ? 'text-neutral-400' : 'text-gray-600'}>
                    <a href="tel:+9779819745073">+977-9819745073</a>,{" "}
                    <a href="tel:+9779764632928">+977-9764632928</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 text-center md:text-start ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Follow Me
            </h4>
            <div className="flex gap-4 text-white/60">
              <a
                href="https://www.facebook.com/dharmendra.ram5073"
                target="_blank"
                className="p-2 border border-[#0A63BC] text-[#298bec]  backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
              >
                {" "}
                <FaFacebook />
              </a>
              <a
                href="https://github.com/dharmendraram"
                target="_blank"
                className="p-2 border border-gray-600 text-[#298bec]  backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
              >
                {" "}
                <FaGithub />
              </a>

              <a
                href="https://www.instagram.com/dharmendraram5073/"
                target="_blank"
                className="p-2 border border-[#E1306C] text-[#E1306C] backdrop-blur-md rounded-full hover:bg-[#E1306C] transition-colors cursor-pointer hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/in/dharmendra-kumar-ram-14a660279/"
                target="_blank"
                className="p-2 border border-[#0A63BC] text-[#298bec] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
              >
                {" "}
                <FaLinkedin />
              </a>

              <a
                href="https://wa.me/9779819745073"
                target="_blank"
                className="p-2 border border-[#46C254] text-[#46C254] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
              >
                {" "}
                <BsWhatsapp />
              </a>

              <a
                href="viber://chat?number=+9779819745073"
                target="_blank"
                className="p-2 border border-[#7360F2] text-[#7360F2] backdrop-blur-md rounded-full hover:bg-[#7360F2] transition-colors cursor-pointer hover:text-white"
              >
                <FaViber />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
