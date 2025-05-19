import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-200">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;