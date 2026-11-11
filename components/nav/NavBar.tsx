import React from 'react';
import { useTypingAnimation } from '../../hooks/useTypingAnimation';

interface NavBarProps {
  onPlayTetris: () => void;
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

const NavBar: React.FC<NavBarProps> = ({ onPlayTetris }) => {
  const text = useTypingAnimation();

  return (
    <nav className="nav" aria-label="Primary">
      <a href="#home" className="nav__brand" aria-label="Rituraj Ingale — home">
        <span aria-hidden="true">{text}</span>
        <span className="nav__cursor" aria-hidden="true" />
      </a>
      <div className="nav__links">
        {NAV_LINKS.map((link, index) => (
          <a key={link.href} href={link.href} className="nav__link label">
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {link.label}
          </a>
        ))}
      </div>
      <button type="button" onClick={onPlayTetris} className="nav__play label">
        <span className="nav__play-icon" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </span>
        Play
      </button>
    </nav>
  );
};

export default NavBar;
