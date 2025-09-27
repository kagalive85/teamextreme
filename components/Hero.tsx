
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center pt-24 md:pt-32">
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-light animate-fade-in-up">
        Unlock Your Media's Potential
      </h1>
      <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Effortlessly upload, process, and share your media content. Our platform provides the tools you need to bring your vision to life.
      </p>
      <div className="mt-8 md:mt-10 flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <button className="px-8 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          Get Started
        </button>
        <button className="px-8 py-3 bg-slate-800 text-slate-300 font-semibold rounded-lg border border-slate-700 hover:bg-slate-700 hover:text-white transition-colors duration-300">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
