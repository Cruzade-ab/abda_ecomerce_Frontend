  import React, { useEffect, useState } from "react";
  import Link from "next/link";
  import Cookies from "js-cookie";
  import Image from "next/image";
  import Search from "../Search bar/search";
  import LoginModal from "@/app/components/cart/LoginModal";
  import { Kaushan_Script } from "next/font/google";
  import { useIntl } from 'next-intl'; // Importa useIntl desde next-intl




  const kaushan = Kaushan_Script({ subsets: ["latin"], weight: ["400"] });

  interface NavbarProps {
    onCategoryChange: (category: string) => void;
    isAdmin: boolean;
  }


  const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, isAdmin }) => {
    const { formatMessage } = useIntl();
  
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
    const [showLoginModal, setShowLoginModal] = useState(false);
  
    useEffect(() => {
      const userLoggedIn = Cookies.get("isLoggedIn") === "true";
      setIsLoggedIn(userLoggedIn);
    }, []);
  
    const handleCartClick = () => {
      if (!isLoggedIn) {
        console.log("User is not logged in, showing login modal");
        setShowLoginModal(true);
      } else {
        window.location.href = '/cart';
      }
    };
  
    return (
      <div>
        <nav className="W-full h-16 bg-white border-b-2 border-gray-300 fixed top-0 left-0 right-0 ">
          <div className="justify-between px-2 mx-auto lg:max-w-7xl md:items center md:flex md:px-8">
            <div>
              <div className="flex items-center justify-between py-2 md:py-5 md:block">
                {/* Logo */}
                <Link href="/" onClick={() => { onCategoryChange('wantedProducts'); setNavbar(false); }}>
                  <h2 className="text-xl pb-8" style={fontStyle}>
                    {formatMessage({ id: 'navbar.brand' })}
                  </h2>
                </Link>
                {/* Hamburger button for mobile */}
                <div className="md:hidden">
                  <button
                    className="p-2 focus:border-gray-400"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <Image src="/icons8-close.svg" width={30} height={30} alt="close icon" />
                    ) : (
                      <Image src="/icons8-hamburger.svg" width={30} height={30} alt="logo" className="focus:border-none active:border-none" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* Search bar */}
            <div className="text-xl">
              <Search />
            </div>
            {/* Navbar links */}
            <div>
              <div className={`${navbar ? "block" : "hidden"} md:flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0`}>
                <ul className="h-screen md:h-auto items-center justify-center md:flex md:items-center md:justify-center">
                  <li className="text-xl text-black py-3 md:px-6 text-center hover:bg-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                    <Link href="/" onClick={() => { onCategoryChange('men'); setNavbar(false); }}>
                      {formatMessage({ id: 'navbar.men' })}
                    </Link>
                  </li>
                  <li className="text-xl text-black py-3 md:px-6 text-center hover:bg-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                    <Link href="/" onClick={() => { onCategoryChange('women'); setNavbar(false); }}>
                      {formatMessage({ id: 'navbar.women' })}
                    </Link>
                  </li>
                  <li className="text-xl text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                    <Link href={isLoggedIn ? "/profile" : "/login"} onClick={() => setNavbar(!navbar)}>
                      {formatMessage({ id: 'navbar.account' })}
                    </Link>
                  </li>
                  <li className="text-xl text-black py-3 md:px-6 text-center border-b-2 md:border-b-0 hover:bg-gray-400 border-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                    <button><a onClick={handleCartClick}>{formatMessage({ id: 'navbar.cart' })}</a></button>
                  </li>
                  {isAdmin && (
                    <li className="text-xl text-black py-3 md:px-6 text-center hover:bg-gray-400 md:hover:text-gray-400 md:hover:bg-transparent">
                      <Link href="/admin" onClick={() => setNavbar(false)}>
                        {formatMessage({ id: 'navbar.admin' })}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {showLoginModal && (
          <LoginModal
            isOpen={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={() => {
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    );
  };
  

  export default Navbar;
