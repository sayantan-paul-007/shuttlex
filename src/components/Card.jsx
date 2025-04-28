import React from "react";

const Card = ({ children, style }) => {
  return (
    <div
      className="animate__animated animate__fadeInDown bg-gray-900 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-md overflow-hidden backdrop-blur-xl relative bg-gradient-to-br from-black-900 to-blue-950 bg-opacity-90 hover:scale-[1.02]"
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
