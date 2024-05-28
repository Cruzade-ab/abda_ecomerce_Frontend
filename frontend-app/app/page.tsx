"use client";
import Banner from "./components/home/banner/banner1";
import { useCallback, useEffect, useState } from "react";
import ProductsContainer from "./components/products/ProductContainer";
import MainLayout from "./components/home/main-layout/MainLayout";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [apiUrl, setApiUrl] = useState('http://localhost:4000/api/products/wantedProducts');
  const [sectionName, setSectionName] = useState('Most Wanted Products');
  const [cartItemCount, setCartItemCount] = useState<number>(0);

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

  const handleCategoryChange = (category: string) => {
    const apiUrlMap = {
      'men': 'http://localhost:4000/api/products/men',
      'women': 'http://localhost:4000/api/products/women',
      'wantedProducts': 'http://localhost:4000/api/products/wantedProducts'
    };

    const sectionNameMap = {
      'men': "Men's Collection",
      'women': "Women's Collection",
      'wantedProducts': "Most Wanted Products"
    };

    const key = category as keyof typeof apiUrlMap; 

    if (apiUrlMap[key] && sectionNameMap[key]) {
        setApiUrl(apiUrlMap[key]);
        setSectionName(sectionNameMap[key]);
    } else {
        console.error('Invalid category:', category);
    }
  };

  const fetchCartItemCount = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/cart/itemCount', {
        method: 'GET',
        credentials: 'include', // Incluye las credenciales en la solicitud
      });
      if (response.ok) {
        const data = await response.json();
        setCartItemCount(data); // No necesitas acceder a data.count, ya que el valor devuelto es directamente la cantidad
      } else {
        console.error('Error al obtener la cantidad de elementos en el carrito');
      }
    } catch (error) {
      console.error('Error fetching cart item count:', error);
    }
  };


  return (
    <div className="bg-[#FBF8F3 ] min-h-screen">
      <MainLayout isAdmin={isAdmin} onCategoryChange={handleCategoryChange}>
        <Banner />
        <ProductsContainer apiUrl={apiUrl} section_name={sectionName} fetchCartItemCount={fetchCartItemCount} />
      </MainLayout>
    </div>
  );
}
