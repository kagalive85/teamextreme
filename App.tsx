
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans antialiased">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="container mx-auto max-w-5xl space-y-16 md:space-y-24">
          <Hero />
          <UploadSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
