"use client";
import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      "Your Favorite Online Store",
      "Providing the best T-Shirts for Everyone",
      "Shop Anywhere, Anytime",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });
  return (
    <div className=" flex flex-col w-full h-96 border border-gray-300 justify-center items-center overflow-visible">
      <h1 className="text-2xl md:text-4xl uppercase font-semibold">
        ABDA T-Shirts
      </h1>
      <p className="text-base md:text-lg mt-2">
        {text} <Cursor cursorBlinking cursorStyle="|" cursorColor="#ffaa17" />
      </p>
    </div>
  );
};

export default Banner;
