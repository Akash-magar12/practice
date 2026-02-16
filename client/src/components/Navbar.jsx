import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              MERN<span className="text-gray-900">Notes</span>
            </Link>
          </div>

          {/* Links Section */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition">
              Home
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-sm transition"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;