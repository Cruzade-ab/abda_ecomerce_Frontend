import Navbar from "../navBar/Navbar";
import React, { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
  isAdmin: boolean; 
};

const MainLayout: React.FC<MainLayoutProps> = ({ children , isAdmin}) => {

    const handleCategoryChange = (category: string) => {
    console.log(`Category changed to ${category}`);
  };

  return (
    <div>
      <Navbar onCategoryChange={handleCategoryChange} isAdmin={isAdmin} />
      <main className="mt-24"> 
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
