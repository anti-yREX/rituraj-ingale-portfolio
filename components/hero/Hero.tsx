
import React from 'react';
import ParticleField from './ParticleField';
import GlassOrb from './GlassOrb';
import { portfolioData } from '../../data/portfolioData';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <ParticleField />

      <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
        <GlassOrb />

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
          {portfolioData.name}
        </h1>
        <p className="font-mono text-sm md:text-base tracking-widest uppercase text-cyan-300/80">
          {portfolioData.title}
        </p>
        <p className="max-w-xl text-base md:text-lg text-gray-300/80 leading-relaxed">
          {portfolioData.tagline}
        </p>
      </div>
    </section>
  );
};

export default Hero;
