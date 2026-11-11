import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionHead from '../layout/SectionHead';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { skillCategories, skills } = portfolioData;

  return (
    <section id="about" className="section">
      <div ref={ref} className={`wrap reveal${isVisible ? ' is-visible' : ''}`}>
        <SectionHead no="01" title="About" note="Sec. 01 / Foundation" />
        <div className="about__grid">
          <p className="about__text">{portfolioData.about}</p>
          <div className="plate concrete-plain">
            <div className="plate__head label">
              <span>Schedule of works</span>
              <span>{skills.length} units</span>
            </div>
            <dl>
              {skillCategories.map(category => (
                <div className="plate__row" key={category.label}>
                  <dt className="label">{category.label}</dt>
                  <dd>{String(category.items.length).padStart(2, '0')} — {category.items.slice(0, 3).join(' / ')}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
