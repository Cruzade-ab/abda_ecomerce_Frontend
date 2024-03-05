"use client"
import Navbar from "./components/home/Navbar";
import Banner from "./components/home/Banner";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/getUser', {
          credentials: "include",
        });
        if (response.ok) {
          const content = await response.json();
          setMessage(`${content.name} ${content.last_name} is logged in with an email: ${content.email}. Its roles is the # ${content.role_id}`);
          setIsLoggedIn(true);
          console.log(content);
        } else {
          setIsLoggedIn(false);
          setMessage('You need to log in.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setMessage('You need to log in.');
      }
    })();
  }, []);

  return (
    <>
      <Navbar/>
      <Banner/>
      <p className="text-center">
        {isLoggedIn ? message : 'You need to log in.'}
      </p>
    </>
  );
}
