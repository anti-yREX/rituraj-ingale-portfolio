
import React, { useEffect, useRef, useState } from 'react';
import TetrisCanvas from '../TetrisCanvas';

interface TetrisEasterEggProps {
  open: boolean;
  onClose: () => void;
}

const TetrisEasterEgg: React.FC<TetrisEasterEggProps> = ({ open, onClose }) => {
  const [score, setScore] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tetris easter egg"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
    >
      <div className="relative w-full max-w-md flex flex-col items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 md:p-6 shadow-[0_0_60px_-12px_rgba(34,211,238,0.4)]">
        <div className="flex items-center justify-between w-full">
          <p className="font-mono text-xs tracking-widest text-cyan-300/80">
            ROWS CLEARED: {score}
          </p>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close Tetris"
            className="font-mono text-xs tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-gray-300 hover:text-cyan-200 hover:border-cyan-400/40 transition-all duration-500"
          >
            ESC / CLOSE
          </button>
        </div>
        <div className="w-full aspect-[12/20] max-h-[70vh]">
          <TetrisCanvas onScoreChange={setScore} />
        </div>
        <p className="font-mono text-[10px] text-gray-500 text-center">
          Arrow keys to move, Up to rotate, Down to drop.
        </p>
      </div>
    </div>
  );
};

export default TetrisEasterEgg;
