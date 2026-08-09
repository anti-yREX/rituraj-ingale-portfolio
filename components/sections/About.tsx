
import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { EASE_DECEL } from '../../constants/theme';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="relative max-w-3xl mx-auto px-4 py-24 md:py-32 text-center"
      style={{
        transition: `opacity 900ms ${EASE_DECEL}, transform 900ms ${EASE_DECEL}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <h2 className="font-mono text-xs tracking-widest text-cyan-300/80 uppercase mb-4">About</h2>
      <p className="text-lg md:text-xl text-gray-200/90 leading-relaxed">
        {portfolioData.about}
      </p>
    </section>
  );
};

export default About;
