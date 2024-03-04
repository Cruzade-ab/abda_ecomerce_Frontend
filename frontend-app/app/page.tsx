"use client"
import Navbar from "./components/home/Navbar";
import Banner from "./components/home/Banner"
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/getUser', {
          credentials: "include",
        });
        const content = await response.json();
        setMessage(`${content.name} is login.`)
        console.log(content);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar/>
      <Banner/>
      {message}
    </>
  );
}