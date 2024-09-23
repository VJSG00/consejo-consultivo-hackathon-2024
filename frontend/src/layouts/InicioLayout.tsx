import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../views/Inicio/Hero';

const InicioLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
};

export default InicioLayout;
