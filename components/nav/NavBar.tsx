import React, { useState, useEffect } from 'react';

interface NavBarProps {
  onPlayTetris: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#contact', label: 'CONTACT' },
];

const WORDS = ['yREX', 'Rituraj Ingale', 'RI'];
const TYPING_SPEED = 100;
const DELETING_SPEED = 100;
const PAUSE_DURATION = 1000;

const NavBar: React.FC<NavBarProps> = ({ onPlayTetris }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_SPEED);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      const currentWordIndex = loopNum % WORDS.length;
      const fullText = WORDS[currentWordIndex];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(DELETING_SPEED);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(TYPING_SPEED);
      }

      if (!isDeleting && text === fullText) {
        setTypingSpeed(PAUSE_DURATION);
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(TYPING_SPEED);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <>
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-8 py-4 backdrop-blur-md bg-black/20 border-b border-white/5">
        <a href="#home" className="font-mono text-sm tracking-widest text-cyan-300/90 hover:text-cyan-200 transition-colors duration-500 flex items-center">
          {text}
          <span className="animate-cursor-blink">_</span>
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
    </>
  );
};

export default NavBar;
