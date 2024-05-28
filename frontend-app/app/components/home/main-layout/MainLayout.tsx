import Navbar from "../navBar/Navbar";
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

type MainLayoutProps = {
  children: ReactNode;
  isAdmin: boolean; 
  onCategoryChange: (category: string) => void;
};

  const MainLayout: React.FC<MainLayoutProps> = ({ children , isAdmin, onCategoryChange}) => {
    const [cartItemCount, setCartItemCount] = useState(0);
  
    useEffect(() => {
      fetchCartItemCount();
    }, []);

    const fetchCartItemCount = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/cart/itemCount', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setCartItemCount(data);
        } else {
          console.error('Error fetching cart item count');
        }
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

  return (
    <div>
      <Navbar onCategoryChange={onCategoryChange} isAdmin={isAdmin} cartItemCount={cartItemCount}/>
      <main className="mt-16"> 
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
