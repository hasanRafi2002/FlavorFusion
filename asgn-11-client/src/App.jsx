
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar component */}
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default App;