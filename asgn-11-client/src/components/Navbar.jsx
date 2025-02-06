


import React, { useState, useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { 
  Menu, X, Sun, Moon, Home, User, UserIcon, ShoppingCart, Image, 
  PlusCircle, ClipboardList, Package, LogOut, UserCircle, Phone 
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'; // Retrieve preference
  });

  // Update the dark mode class on the document and save the preference
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode); // Add or remove 'dark' class
    localStorage.setItem('darkMode', newDarkMode); // Save preference
  };

  // Sync the dark mode class on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]); // Run this effect when darkMode changes

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOutUser();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/allfood', label: 'All Foods', icon: ShoppingCart },
    { path: '/gallery', label: 'Gallery', icon: Image },
    { path: '/contact', label: 'Contact Us', icon: Phone },
    { path: '/profile', label: 'Profile', icon: UserCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 py-4 shadow-md bg-gradient-to-r from-blue-50 to-purple-100 dark:bg-gradient-to-r dark:from-[#1a1c2c] dark:to-[#3b4c6b] dark:text-emerald-200">
      <div className="container flex items-center justify-between px-4 mx-auto">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-emerald-800 dark:text-emerald-200">
          <img className="h-[50px] w-[50px]" src="https://github.com/hasanrafi1122/photos/blob/main/ph-assignment/a11/a11-icon.png?raw=true" alt="EquiSport Hub Logo" />
          FlavorFusion
        </Link>

        {/* Mobile Menu Toggle & Dark Mode Toggle */}
        <div className="flex items-center xl:hidden">
          <button onClick={handleDarkModeToggle} className="mr-4 text-emerald-800 dark:text-emerald-200">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={toggleMobileMenu} className="text-emerald-800 dark:text-emerald-200">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                <Link to="/" className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">EquiSport Hub</Link>
                <button onClick={toggleMobileMenu}>
                  <X size={24} className="text-emerald-800 dark:text-emerald-200" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-grow p-4 space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) => `
                      flex items-center space-x-3 p-3 rounded-lg 
                      ${isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-600 dark:text-emerald-100' : 'hover:bg-emerald-50 dark:hover:bg-emerald-700'}
                    `}
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </NavLink>
                ))}

                <Link
                  to="/myfood"
                  onClick={toggleMobileMenu}
                  className="flex items-center p-3 space-x-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                >
                  <Package size={18} className="text-emerald-600 dark:text-emerald-200" />
                  <span>My Food</span>
                </Link>

                <Link
                  to="/addfood"
                  onClick={toggleMobileMenu}
                  className="flex items-center p-3 space-x-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                >
                  <PlusCircle size={18} className="text-emerald-600 dark:text-emerald-200" />
                  <span>Add Food</span>
                </Link>

                <Link
                  to="/myorder"
                  onClick={toggleMobileMenu}
                  className="flex items-center p-3 space-x-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                >
                  <ClipboardList size={18} className="text-emerald-600 dark:text-emerald-200" />
                  <span>My Orders</span>
                </Link>
              </div>

              {/* User Section */}
              <div className="p-4 border-t dark:border-gray-700">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <img src={user.photoURL || 'https://via.placeholder.com/150'} alt="User Avatar" className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-semibold text-emerald-800 dark:text-emerald-200">{user.displayName || 'User'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-200">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        onClick={toggleMobileMenu}
                        className="flex items-center p-3 space-x-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                      >
                        <UserIcon size={18} className="text-emerald-600 dark:text-emerald-200" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center justify-center w-full p-3 space-x-2 text-white bg-red-500 rounded-lg"
                      >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link to="/register" onClick={toggleMobileMenu} className="block w-full p-3 text-center text-white bg-teal-500 rounded-lg">
                      Register
                    </Link>
                    <Link to="/login" onClick={toggleMobileMenu} className="block w-full p-3 text-center text-teal-500 border border-teal-500 rounded-lg">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="items-center hidden space-x-8 xl:flex">
          <div className="flex space-x-6 font-semibold text-slate-700 dark:text-emerald-200">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  flex items-center space-x-2 
                  hover:text-emerald-600 
                  ${isActive ? 'text-emerald-600' : ''}
                `}
              >
                <link.icon size={20} />
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={handleDarkModeToggle} className="text-emerald-800 dark:text-emerald-200 tooltip tooltip-bottom" data-tip="Theme">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Desktop User Section */}
          {user ? (
            <div className="flex flex-row gap-4">
              <button onClick={handleSignOut} className="text-emerald-800 dark:text-emerald-200 hover:text-red-600 tooltip tooltip-bottom" data-tip="Sign Out">
                <LogOut size={24} />
              </button>

              <div className="relative group ">
                <img
                  src={user.photoURL || 'https://via.placeholder.com/150'}
                  alt="User Avatar"
                  className="w-10 h-10 transition border-2 rounded-full border-emerald-500 hover:scale-110"
                />
                <div className="absolute right-0 invisible w-64 p-4 mt-2 transition-all duration-300 bg-white shadow-lg opacity-0 dark:bg-[#1a2230] top-full rounded-xl group-hover:opacity-100 group-hover:visible">
                  <div className="flex items-center mb-4 space-x-3">
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/150'}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-emerald-800 dark:text-emerald-200">{user.displayName || 'User'}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-200">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center p-2 space-x-2 transition rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                    >
                      <User size={18} className="text-emerald-600 dark:text-emerald-200" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/addfood"
                      className="flex items-center p-2 space-x-2 transition rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                    >
                      <PlusCircle size={18} className="text-emerald-600 dark:text-emerald-200" />
                      <span>Add Food</span>
                    </Link>
                    <Link
                      to="/myfood"
                      className="flex items-center p-2 space-x-2 transition rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                    >
                      <Package size={18} className="text-emerald-600 dark:text-emerald-200" />
                      <span>My Food</span>
                    </Link>
                    <Link
                      to="/myorder"
                      className="flex items-center p-2 space-x-2 transition rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-700"
                    >
                      <ClipboardList size={18} className="text-emerald-600 dark:text-emerald-200" />
                      <span>My Order</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full p-2 space-x-2 text-red-600 transition rounded-lg hover:bg-red-50 dark:hover:bg-red-700"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/register" className="px-4 py-2 text-white transition bg-teal-500 rounded-lg hover:bg-teal-600">
                Register
              </Link>
              <Link to="/login" className="px-4 py-2 text-teal-500 transition border border-teal-500 rounded-lg hover:bg-teal-50">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;