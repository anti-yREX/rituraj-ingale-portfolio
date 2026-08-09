
import React, { useCallback, useRef, useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { EASE_DECEL } from '../../constants/theme';
import type { SkillCategory } from '../../types';

interface FeatureCardProps {
  category: SkillCategory;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ category, index }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const clientX = event.clientX;
    const clientY = event.clientY;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      setSpotlight({
        x: ((clientX - rect.left) / rect.width) * 100,
        y: ((clientY - rect.top) / rect.height) * 100,
      });
    });
  }, []);

  return (
    <div
      ref={node => {
        cardRef.current = node;
        ref.current = node;
      }}
      onMouseMove={handleMouseMove}
      className="group relative bg-[#0a0a0a] p-6 md:p-8 overflow-hidden transition-[border-color,box-shadow] duration-700 hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.35)]"
      style={{
        transitionTimingFunction: EASE_DECEL,
        transitionDelay: `${index * 80}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transitionProperty: 'opacity, transform, box-shadow',
        transitionDuration: '700ms',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(34,211,238,0.15), transparent 60%)`,
        }}
      />
      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-2">{category.label}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{category.description}</p>
        <div className="flex flex-wrap gap-2">
          {category.items.map(item => (
            <span
              key={item}
              className="font-mono text-xs px-2 py-1 rounded-full border border-white/10 text-cyan-200/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureGrid: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="skills"
      ref={ref}
      className="relative max-w-6xl mx-auto px-4 py-24 md:py-32"
      style={{
        transition: `opacity 900ms ${EASE_DECEL}`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <h2 className="font-mono text-xs tracking-widest text-cyan-300/80 uppercase text-center mb-12">
        Core Technologies
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
        {portfolioData.skillCategories.map((category, index) => (
          <FeatureCard key={category.label} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeatureGrid;
