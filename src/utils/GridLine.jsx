import React, { Fragment } from "react";
import { useTheme } from "../context/ThemeContext";

const GridLine = () => {
  const { isDark } = useTheme();
  const gridColor = isDark ? '#555555' : '#cccccc';
  
  return (
    <Fragment>
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(to-right,transparent,transparent 24px,${gridColor} 24px,${gridColor} 25px)`
          }}
        ></div>
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(to-bottom,transparent,transparent 24px,${gridColor} 24px,${gridColor} 25px)`
          }}
        ></div>
      </div>
    </Fragment>
  );
};

export default GridLine;
