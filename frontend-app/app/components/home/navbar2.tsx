import '@mdi/font/css/materialdesignicons.min.css';
import { Kaushan_Script } from "next/font/google";
import Link from 'next/link'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: ["400"]});


export default function Navbar () {
    const fontStyle = {
        fontFamily: kaushan.className,
        fontSize: "70px",
        color: "#5B5C31",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", // Drop shadow effect
        WebkitTextStroke: "1px black", // Stroke effect,
        fontStyle: "italic",
      }
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const userLoggedIn = Cookies.get('isLoggedIn');
    if (userLoggedIn === 'true') {
        setIsLoggedIn(true);
    }
    }, [])

    return (
        <nav className="W-full h-14 bg-white border-b-2 border-black fixed top-0 left-0 right-0 z-10 ">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items center md:flex md:px-8">
            <div>
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    {/*Logo*/}
                <Link href="*/*">
                  <h2 style={fontStyle}>ABDA Shirts</h2>
                </Link>
                {/*hamburger button for mobile*/}
                <div className="md:hidden"
                </div>
            </div>

        </div>
        </nav>
    )


    