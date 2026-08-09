
import React from 'react';

interface NavBarProps {
  onPlayTetris: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#contact', label: 'CONTACT' },
];

const NavBar: React.FC<NavBarProps> = ({ onPlayTetris }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 backdrop-blur-md bg-black/20 border-b border-white/5">
      <a href="#home" className="font-mono text-sm tracking-widest text-cyan-300/90 hover:text-cyan-200 transition-colors duration-500">
        RI_
      </a>
      <div className="flex items-center gap-4 md:gap-8">
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="hidden sm:inline font-mono text-xs tracking-widest text-gray-400 hover:text-cyan-300 transition-colors duration-500"
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={onPlayTetris}
          className="font-mono text-xs tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-gray-300 hover:text-cyan-200 hover:border-cyan-400/40 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] transition-all duration-500"
        >
          PLAY
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
