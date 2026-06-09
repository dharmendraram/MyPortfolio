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
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-16">
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
        </div>
      </div>
    </section>
  );
};

export default Contact;
