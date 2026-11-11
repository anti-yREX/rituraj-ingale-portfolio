import React from 'react';
import { portfolioData } from '../../data/portfolioData';

/** Conveyor belt of every skill. The list is duplicated so the loop is seamless. */
const Ticker: React.FC = () => (
  <div className="ticker void" aria-hidden="true">
    <div className="ticker__track">
      {[0, 1].map(copy => (
        <ul className="ticker__list" key={copy}>
          {portfolioData.skills.map(skill => (
            <li className="ticker__item" key={skill}>{skill}</li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default Ticker;
