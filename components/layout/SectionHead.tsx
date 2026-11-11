import React from 'react';

interface SectionHeadProps {
  no: string;
  title: string;
  note: string;
}

const SectionHead: React.FC<SectionHeadProps> = ({ no, title, note }) => (
  <header className="sec-head">
    <span className="sec-head__no" aria-hidden="true">{no}</span>
    <h2 className="sec-head__title display">{title}</h2>
    <p className="sec-head__note label">{note}</p>
  </header>
);

export default SectionHead;
