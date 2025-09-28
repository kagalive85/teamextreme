
import React from 'react';
import GearIcon from './components/GearIcon';

function App() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 text-white">
      <div className="flex flex-col items-center justify-center text-center p-6 space-y-6">
        <GearIcon className="w-20 h-20 md:w-28 md:h-28 text-indigo-400/80 [animation:spin_12s_linear_infinite]" />
        
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-indigo-300">
          Pardon Our Dust
        </h1>
        
        <p className="max-w-md text-lg text-slate-400 md:text-xl">
          Our new website is currently under construction. We're working hard to bring you a better experience. We'll be back online soon!
        </p>
      </div>
      
      <footer className="absolute bottom-5 text-sm text-slate-600">
        © {new Date().getFullYear()} Our Company. All Rights Reserved.
      </footer>
    </main>
  );
}

export default App;
