import "@mdi/font/css/materialdesignicons.min.css";
import { Kaushan_Script } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import Image from "next/image";
import SearchBar from "../Search bar";
import React from "react";



const kaushan = Kaushan_Script({ subsets: ["latin"], weight: ["400"] });

export default function Navbar() {
  const fontStyle = {
    fontFamily: kaushan.className,
    fontSize: "44px",
    color: "#5B5C31",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", // Drop shadow effect
    WebkitTextStroke: "1px black", // Stroke effect,
    fontStyle: "italic",
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [navbar, setNavbar] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const handlesearch = (value: string) => {
      setSearchValue(value);

  }
  useEffect(() => {
    const userLoggedIn = Cookies.get("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <nav className= " bg-white fixed top-0 left-0 right-0 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-6">
            <div className="flex items-center">
              
                <Link href="/">
                  <h2 className="text-xl pt-4 flex flex-shrink-1" style={fontStyle}>
                    ABDA Shirts
                  </h2>
                </Link>
            
              {/*hamburger button for mobile*/}
              <div className="md:hidden block">
                <button
                  className="p-2 focus:border-gray-400 "
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image
                      src="/icons8-close.svg"
                      width={30}
                      height={30}
                      alt="close icon"
                    />
                  ) : (
                    <Image
                      src="/icons8-hamburger.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="text-xl">
                <SearchBar onSearch={handlesearch} />
          </div>

          <div>
            <div
              className={`${ 
                navbar ? "block" : "hidden"}
               md:flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex md:items-center md:justify-center ">
                <li className="pb-6 text-xl   text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/men" onClick={() => setNavbar(!navbar)}>
                    <h1>Men</h1>
                  </Link>
                </li>
                <li className="pb-6 text-xl  text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/women" onClick={() => setNavbar(!navbar)}>
                    <h1>Women</h1>
                  </Link>
                </li>
                <li className="pb-6 text-xl  text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/login" onClick={() => setNavbar(!navbar)}>
                    <h1>Account</h1>
                  </Link>
                </li>
                <li className="pb-6 text-xl  text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/cart" onClick={() => setNavbar(!navbar)}>
                    <h1>Car</h1>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      </div>
  );
}
