
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent py-4 px-4 sm:px-6 lg:px-8">
      <nav className="container mx-auto flex justify-between items-center max-w-5xl">
        <div className="flex items-center space-x-2">
          <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <span className="text-xl font-bold text-slate-100">MediaFlow</span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-slate-300">
          <a href="#" className="hover:text-brand-light transition-colors duration-300">Features</a>
          <a href="#" className="hover:text-brand-light transition-colors duration-300">Pricing</a>
          <a href="#" className="hover:text-brand-light transition-colors duration-300">Contact</a>
        </div>
        <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-300">
          Sign In
        </button>
      </nav>
    </header>
  );
};

export default Header;
