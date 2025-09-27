
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MediaFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
