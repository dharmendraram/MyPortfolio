import React from "react";
import { useTheme } from "../context/ThemeContext";

const HeadingHero = () => {
  const { isDark } = useTheme();

  return (
    <div className="text-center md:text-left">
      <h2 className={`text-xl md:text-3xl mb-6 mt-3 ${isDark ? "text-white" : "text-gray-900"}`}>
        And I&apos;m a <span className="text-outline pb-1">Full-Stack Developer</span>
      </h2>
    </div>
  );
};

export default HeadingHero;
