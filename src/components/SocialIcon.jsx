import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import {
  FaGithub,
  FaLinkedin,
  FaViber,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const SocialIcon = () => {
  const { isDark } = useTheme();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dharmendraram/",
      icon: <FaLinkedin />,
      hoverColor: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      color: "text-[#0A66C2]",
    },
    {
      name: "GitHub",
      href: "https://github.com/dharmendraram",
      icon: <FaGithub />,
      hoverColor: "hover:bg-neutral-800 hover:text-white hover:border-neutral-700",
      color: isDark ? "text-neutral-200" : "text-neutral-800",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/9779819745073",
      icon: <BsWhatsapp />,
      hoverColor: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      color: "text-[#25D366]",
    },
    {
      name: "Viber",
      href: "viber://chat?number=+9779819745073",
      icon: <FaViber />,
      hoverColor: "hover:bg-[#7360F2] hover:text-white hover:border-[#7360F2]",
      color: "text-[#7360F2]",
    },
  ];

  return (
    <aside
      aria-label="Social media channels"
      className="fixed z-40 right-3.5 bottom-20 sm:right-6 sm:bottom-8"
    >
      <div
        className={`flex flex-col gap-2 p-1.5 rounded-full border backdrop-blur-xl shadow-xl transition-all duration-300 ${
          isDark
            ? "bg-[#0e121a]/80 border-white/15 shadow-black/40"
            : "bg-white/80 border-slate-300/80 shadow-slate-300/60"
        }`}
      >
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={item.name}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg border border-transparent transition-all duration-200 cursor-pointer ${
              item.color
            } ${item.hoverColor} ${
              isDark ? "hover:shadow-md" : "hover:shadow-sm"
            }`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default SocialIcon;
