import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SectionHead from '../layout/SectionHead';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const { contact } = portfolioData.footer;

  const doors = [
    { label: 'GitHub', value: `@${contact.github}`, href: `https://github.com/${contact.github}`, external: true },
    { label: 'LinkedIn', value: `in/${contact.linkedin}`, href: `https://www.linkedin.com/in/${contact.linkedin}`, external: true },
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, external: false },
  ];

  return (
    <section id="contact" className="section">
      <div ref={ref} className={`wrap reveal${isVisible ? ' is-visible' : ''}`}>
        <SectionHead no="03" title="Contact" note="Sec. 03 / Access points" />
        <p className="contact__lead">{portfolioData.contactLine}</p>
        <div className="doors concrete-plain">
          {doors.map((door, index) => (
            <a
              key={door.label}
              href={door.href}
              className="door"
              {...(door.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="door__no label" aria-hidden="true">A{index + 1}</span>
              <span className="door__label display">{door.label}</span>
              <span className="door__value">{door.value}</span>
              <span className="door__arrow" aria-hidden="true">{door.external ? '↗' : '→'}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
