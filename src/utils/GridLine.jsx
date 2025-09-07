import React, { Fragment } from "react";

const GridLine = () => {
  return (
    <Fragment>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to-right,transparent,transparent_24px,#555555_24px,#555555_25px)] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to-bottom,transparent,transparent_24px,#555555_24px,#555555_25px)] opacity-20 pointer-events-none"></div>
      </div>
    </Fragment>
  );
};

export default GridLine;
