import React from 'react';
import { portfolioData } from '../../data/portfolioData';

/** Footer styled as the title block in the corner of an engineering drawing. */
const TitleBlock: React.FC = () => (
  <footer className="titleblock void on-dark">
    <div className="titleblock__strip hazard" aria-hidden="true" />
    <div className="wrap">
      <dl className="titleblock__grid">
        <div className="titleblock__cell">
          <dt className="label">Project</dt>
          <dd>Portfolio — {portfolioData.name}</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="label">Drawn by</dt>
          <dd>yREX / {portfolioData.title}</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="label">Rev.</dt>
          <dd>{new Date().getFullYear()}</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="label">Sheet</dt>
          <dd>01 of 01</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="label">Return</dt>
          <dd><a href="#home" className="titleblock__top">Top ↑</a></dd>
        </div>
      </dl>
    </div>
  </footer>
);

export default TitleBlock;
