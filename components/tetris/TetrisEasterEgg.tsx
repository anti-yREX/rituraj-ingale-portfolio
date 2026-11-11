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
    <div role="dialog" aria-modal="true" aria-label="Tetris easter egg" className="bay">
      <div className="bay__frame concrete-plain">
        <div className="bay__strip hazard" aria-hidden="true" />
        <div className="bay__bar">
          <p className="bay__score label">
            Rows cleared <strong>{String(score).padStart(2, '0')}</strong>
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Tetris"
            className="bay__close label on-dark"
          >
            Esc / Close
          </button>
        </div>
        <div className="bay__board">
          <TetrisCanvas onScoreChange={setScore} />
        </div>
        <p className="bay__hint label">← → move · ↑ rotate · ↓ drop</p>
      </div>
    </div>
  );
};

export default TetrisEasterEgg;
