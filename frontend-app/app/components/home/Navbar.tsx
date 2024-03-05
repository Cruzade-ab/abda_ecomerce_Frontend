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
    }, []);

return(
    <nav className="w-full bg-withe-200 h-20 flex flex-row items-center justify-between border-b-2 border-black ">
        <div className="m-6">
            {isLoggedIn ? (
          <Link href="/"> 
            <i className='mdi mdi-account text-black-400 text-6xl'></i>
          </Link>
        ) : (
          <Link href="/login">
            <i className='mdi mdi-account-outline text-black-400 text-6xl'></i>
          </Link>
        )}
        </div>
        <div className="m-6">
                <Link href="/">
                <p style={fontStyle}>ABDA Shirts</p>
                </Link>
        </div>
        <div className="m-6">
            <Link href="/cart">
                <i className='mdi mdi-cart-outline text-black-400 text-5xl '>
                </i>
            </Link>
        </div>
    </nav>
)
    
}