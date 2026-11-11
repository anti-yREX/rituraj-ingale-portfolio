import React from 'react';
import Elevation from './Elevation';
import { portfolioData } from '../../data/portfolioData';

const Hero: React.FC = () => {
  const [firstName, ...rest] = portfolioData.name.split(' ');

  return (
    <section id="home" className="hero">
      <div className="hero__main wrap">
        <div className="hero__copy">
          <p className="hero__kicker label">
            <span className="tag">Sec. 00</span>
            <span className="tag tag--light">{portfolioData.title}</span>
          </p>
          <h1 className="hero__name display" aria-label={portfolioData.name}>
            <span aria-hidden="true">{firstName}</span>
            <span aria-hidden="true">{rest.join(' ')}</span>
          </h1>
          <p className="hero__tagline">{portfolioData.tagline}</p>
        </div>

        <figure className="hero__figure">
          <Elevation />
          <figcaption className="hero__figcaption label">
            <span>Fig. 01 — Elevation A</span>
            <span>1:200</span>
          </figcaption>
        </figure>
      </div>

      <dl className="specs">
        {portfolioData.specs.map(spec => (
          <div className="specs__cell" key={spec.label}>
            <dt className="label">{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Hero;
