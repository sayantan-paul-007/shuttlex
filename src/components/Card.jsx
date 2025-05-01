import React from "react";

const Card = ({ children, style }) => {
  return (
    <div
      className="animate__animated animate__fadeInDown bg-gray-900 rounded-2xl text-white shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full max-w-md overflow-hidden backdrop-blur-xl relative bg-gradient-to-br from-black-900 to-blue-950 bg-opacity-90 hover:scale-[1.02] desktop-2k:text-xl"
      style={style}
    >
       <div className="absolute inset-0">
                                          {[...Array(80)].map((_, i) => (
                                            <div
                                              key={i}
                                              className="absolute rounded-full bg-white/35"
                                              style={{
                                                width: `${Math.random() * 2 + 1}px`,
                                                height: `${Math.random() * 2 + 1}px`,
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                opacity: Math.random() * 0.7 + 0.3,
                                                animation: `twinkle ${
                                                  Math.random() * 5 + 3
                                                }s infinite ease-in-out`,
                                              }}
                                            />
                                          ))}
                                        </div>
      {children}
    </div>
  );
};

export default Card;
