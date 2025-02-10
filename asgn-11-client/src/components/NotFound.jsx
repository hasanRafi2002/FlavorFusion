import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200 ">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle size={100} className="text-teal-800" />
        </div>
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
        <p className="mb-6 text-xl text-gray-600 dark:text-gray-200">
          Oops! The page you're looking for seems to have wandered off.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-800"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;