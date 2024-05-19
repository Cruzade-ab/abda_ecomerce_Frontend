import Navbar from "../navBar/Navbar";
import React, { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
  isAdmin: boolean; 
  onCategoryChange: (category: string) => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children , isAdmin, onCategoryChange}) => {

  return (
    <div>
      <Navbar onCategoryChange={onCategoryChange} isAdmin={isAdmin} />
      <main className="mt-16"> 
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
