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
    fontSize: "42px",
    color: "#5B5C31",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", // Drop shadow effect
    WebkitTextStroke: "1px black", // Stroke effect,
    fontStyle: "italic",
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [navbar, setNavbar] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const handlesearch = (value: string) => {
    setSearchValue(value);
  };
  useEffect(() => {
    const userLoggedIn = Cookies.get("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <nav className=" relative w-full border border-gray-300 bg-white top-0 right-0 left-0 ">
        <div className=" flex justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 ">
          <div>
            <div className="flex flex-row items-center justify-between py-3 md:py-5 md:block">
              {/*Titulo de la Pagina (LOGO)*/}
              <Link href="/">
                <h1 className="text-xl flex flex-shrink-1" style={fontStyle}>
                  ABDA Shirts
                </h1>
              </Link>

              {/* codigo para icono de hamburger para mobiles*/}
              <div className="md:hidden">
                <button
                  className="p-2  text-gray-600 rounded outline-none  focus:border-gray-400 "
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

          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center  md:flex">
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
                    <h1>Cart</h1>
                  </Link>
                </li>
                <SearchBar onSearch={handlesearch} />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
