import React from "react";

const TitleItems = ({ title, className }) => {
  return (
    <div
      className={`${className} border-s-2 border-primary-01 px-2 py-1 mb-4 text-md text-primary-01 font-bold `}
    >
      {title}
    </div>
  );
};

export default TitleItems;
