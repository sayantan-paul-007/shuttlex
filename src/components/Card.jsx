import React from "react";

const Card = ({ children, style }) => {
  return (
    <div
      className="animate__animated animate__fadeInDown max-w-sm bg-black text-white bg-white/10 border border-white/20 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300 "
      style={style}
    >
      {children}
    </div>
  );
};

export default Card;
