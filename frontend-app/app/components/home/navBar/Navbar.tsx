import "@mdi/font/css/materialdesignicons.min.css";
import { Kaushan_Script } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import Image from "next/image";
import SearchBar from "../Search bar";
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: ["400"] });

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  isAdmin: boolean;
  
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, isAdmin }) => {
  const fontStyle = {
    fontFamily: kaushan.className,
    fontSize: "46px",
    color: "#5B5C31",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", // Drop shadow effect
    WebkitTextStroke: "1px black", // Stroke effect,
    fontStyle: "italic",
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);


  useEffect(() => {
    const userLoggedIn = Cookies.get("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <nav className="W-full h-20 bg-white border-b-2 border-black fixed top-0 left-0 right-0  ">
        <div className="justify-between px-2 mx-auto lg:max-w-7xl md:items center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-2 md:py-5 md:block">
              {/*Logo*/}
              <Link href="/" onClick={() => { onCategoryChange('wantedProducts'); setNavbar(false); }} >
                <h2 className="text-xl pb-8" style={fontStyle}>
                  ABDA Shirts
                </h2>
              </Link>
              {/*hamburger button for mobile*/}
              <div className="md:hidden">
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
            <SearchBar onSearch={function (value: string): void {
              throw new Error("Function not implemented.");
            }} />
          </div>

          <div>
            <div
              className={`${navbar ? "block" : "hidden"
                } md:flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 `}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex md:items-center md:justify-center ">
                <li className="text-xl text-black py-3 md:px-6 text-center hover:bg-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/" onClick={() => { onCategoryChange('men'); setNavbar(false); }}>
                    Men
                  </Link>
                </li>
                <li className="text-xl text-black py-3 md:px-6 text-center hover:bg-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/" onClick={() => { onCategoryChange('women'); setNavbar(false); }}>
                    Women
                  </Link>
                </li>
                <li className="pb-6 text-xl  text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href={isLoggedIn ? "/profile" : "/login"} onClick={() => setNavbar(!navbar)}>
                    Account
                  </Link>
                </li>
                <li className="pb-6 text-xl  text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                  <Link href="/cart" onClick={() => setNavbar(!navbar)}>
                    <h1>Cart</h1>
                  </Link>
                </li>
                {isAdmin && (
                  <li className="text-xl text-black py-3 md:px-6 text-center hover:bg-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                    <Link href="/admin" onClick={() => setNavbar(false)}>
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;