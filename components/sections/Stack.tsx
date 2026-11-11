import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionHead from '../layout/SectionHead';
import type { SkillCategory } from '../../types';

interface SlabProps {
  category: SkillCategory;
  level: number;
  index: number;
}

/** One floor of the building: level marker, description, and a facade of skill "windows". */
const Slab: React.FC<SlabProps> = ({ category, level, index }) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>(0.1);

  return (
    <article
      ref={ref}
      className={`slab concrete reveal${isVisible ? ' is-visible' : ''}`}
      style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
    >
      <div className="slab__level" aria-hidden="true">
        L{String(level).padStart(2, '0')}
        <small>{String(category.items.length).padStart(2, '0')} units</small>
      </div>
      <div className="slab__body">
        <h3 className="slab__title">{category.label}</h3>
        <p className="slab__desc">{category.description}</p>
      </div>
      <ul className="slab__windows">
        {category.items.map(item => (
          <li className="window" key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
};

const Stack: React.FC = () => {
  const { skillCategories } = portfolioData;

  return (
    <section id="stack" className="section stack void on-dark">
      <div className="wrap">
        <SectionHead no="02" title="Stack" note="Sec. 02 / Core technologies" />
        <div className="stack__floors">
          {skillCategories.map((category, index) => (
            <Slab
              key={category.label}
              category={category}
              level={skillCategories.length - index}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
