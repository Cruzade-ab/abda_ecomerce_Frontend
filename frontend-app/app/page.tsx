"use client"
import Banner from "./components/home/banner/banner1";
import { useEffect, useState } from "react";
import ProductsContainer from "./components/products/ProductContainer";
import MainLayout from "./components/home/main-layout/MainLayout";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [apiUrl, setApiUrl] = useState('http://localhost:4000/api/products/wantedProducts');
  const [sectionName, setSectionName] = useState('Most Wanted Products');


  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/getUser', {
          credentials: "include",
        });
        if (response.ok) {
          const content = await response.json();
          setIsLoggedIn(true);
          setIsAdmin(content.role_id === 2);
          console.log(content);
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    })();
  }, []);


  return (
    <>
      <MainLayout isAdmin={isAdmin} >
        <Banner/>
        <ProductsContainer apiUrl={apiUrl} section_name={sectionName}/>
      </MainLayout>
    </>
  );
}
