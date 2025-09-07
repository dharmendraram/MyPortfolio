import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaViber } from "react-icons/fa";

const SocialIcon = () => {
  return (
    <div
      className="fixed
             z-50  py-1
            bottom-20 right-4
             lg:right-4 lg:bottom-9 
             md:right-4 md:bottom-9  
             transition-all"
    >
      <ul className="w-full flex justify-around flex-col gap-2 items-center text-white">
        <a
          href=""
          className="p-2 border border-[#0A63BC] text-[#298bec] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
        >
          {" "}
          <FaLinkedin />
        </a>

        <a
          href=""
          className="p-2 border border-[#46C254] text-[#46C254] backdrop-blur-md rounded-full hover:bg-teal-500 transition-colors  cursor-pointer hover:text-white"
        >
          {" "}
          <BsWhatsapp />
        </a>
        <a
          href=""
          className="p-2 border border-[#7360F2] text-[#7360F2] backdrop-blur-md rounded-full hover:bg-[#7360F2] transition-colors cursor-pointer hover:text-white"
        >
          <FaViber />
        </a>
      </ul>
    </div>
  );
};

export default SocialIcon;
