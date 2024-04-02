import Navbar from "../navBar/Navbar";
import React, { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const handleCategoryChange = (category: string) => {
    console.log(`Category changed to ${category}`);
  };

  return (
    <div>
      <Navbar onCategoryChange={handleCategoryChange} isAdmin={false} />
      <main style={{ marginTop: '64px' }}> 
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
