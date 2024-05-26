import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Image from "next/image";
import Search from "../Search bar/search";
import LoginModal from "@/app/components/cart/LoginModal";
import { Kaushan_Script } from "next/font/google";
import Icon from "@mdi/react";
import { mdiAccountCircle, mdiCartVariant } from "@mdi/js";

const kaushan = Kaushan_Script({ subsets: ["latin"], weight: ["400"] });

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, isAdmin }) => {
  const fontStyle = {
    fontFamily: kaushan.className,
    fontSize: "36px",
    color: isAdmin ? "#FFFFFF" : "#5B5C31", // Invert text color for admin
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
    WebkitTextStroke: isAdmin ? "0.5px black" : "1px black",
    fontStyle: "italic",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const userLoggedIn = Cookies.get("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      window.location.href = "/cart";
    }
  };

  return (
    <div>
      <nav className={`w-full h-18 ${isAdmin ? "bg-black text-white" : "bg-white text-black"} border-b-2 ${isAdmin ? "border-white" : "border-gray-300"} fixed top-0 left-0 right-0 z-50`}>
        <div className="flex justify-between items-center px-4 mx-auto lg:max-w-7xl md:px-8">
          <div className="flex items-center py-2">
            <Link href="/" onClick={() => { onCategoryChange('wantedProducts'); setNavbar(false); }}>
              <h2 className="text-xl" style={fontStyle}>ABDA Shirts</h2>
            </Link>
            <div className="md:hidden ml-4">
              <button
                className="p-2 focus:outline-none"
                onClick={() => setNavbar(!navbar)}
                aria-label="Toggle navigation"
              >
                {navbar ? (
                  <Image src="/icons8-close.svg" width={30} height={30} alt="Close icon" />
                ) : (
                  <Image src="/icons8-hamburger.svg" width={30} height={30} alt="Menu icon" />
                )}
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <Search />
          </div>
          <div className={`md:flex ${navbar ? "block" : "hidden"} w-full md:w-auto mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row items-center md:space-x-8 mt-4 md:mt-0">
              {isAdmin && (
                <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                  <Link href="/admin" onClick={() => setNavbar(false)}>Admin</Link>
                </li>
              )}
              <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                <Link href="/" onClick={() => { onCategoryChange('men'); setNavbar(false); }}>Men</Link>
              </li>
              <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                <Link href="/" onClick={() => { onCategoryChange('women'); setNavbar(false); }}>Women</Link>
              </li>
              <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                <Link href={isLoggedIn ? "/profile" : "/login"} onClick={() => setNavbar(!navbar)}>
                  <Icon path={mdiAccountCircle} size={1.3} className="text-current" />
                </Link>
              </li>
              <li className="text-xl py-2 md:py-0 hover:text-gray-400">
                <button onClick={handleCartClick}>
                  <Icon path={mdiCartVariant} size={1.3} className="text-current" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
