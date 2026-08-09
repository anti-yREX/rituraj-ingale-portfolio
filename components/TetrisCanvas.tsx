
import React, { useRef, useEffect, useState } from 'react';
import { useTetris } from '../hooks/useTetris';
import { TETROMINOS, BOARD_WIDTH, BOARD_HEIGHT, getTetrisTheme } from '../constants/tetris';

interface TetrisCanvasProps {
  onScoreChange?: (score: number) => void;
}

const ARROW_KEY_CODES = new Set([37, 38, 39, 40]);

const TetrisCanvas: React.FC<TetrisCanvasProps> = ({ onScoreChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [themeIndex, setThemeIndex] = useState(0);
  const { board, handleKeyDown, gameOver, startGame, player, rowsCleared } = useTetris();

  useEffect(() => {
    if (onScoreChange) {
      onScoreChange(rowsCleared);
    }
  }, [rowsCleared, onScoreChange]);

  // Cycle this canvas's own accent color on every row clear (cosmetic, scoped to Tetris only).
  const prevRowsCleared = useRef(rowsCleared);
  useEffect(() => {
    if (rowsCleared > prevRowsCleared.current) {
      setThemeIndex(prev => prev + 1);
    }
    prevRowsCleared.current = rowsCleared;
  }, [rowsCleared]);

  // Auto-start game on mount
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (ARROW_KEY_CODES.has(event.keyCode)) {
        event.preventDefault();
      }
      handleKeyDown({ keyCode: event.keyCode });
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleKeyDown]);

  const calculateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return { blockSize: 20, width: BOARD_WIDTH * 20, height: BOARD_HEIGHT * 20 };

    const container = canvas.parentElement;
    if (!container) return { blockSize: 20, width: BOARD_WIDTH * 20, height: BOARD_HEIGHT * 20 };

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const blockSizeByWidth = containerWidth / BOARD_WIDTH;
    const blockSizeByHeight = containerHeight / BOARD_HEIGHT;

    const blockSize = Math.floor(Math.min(blockSizeByWidth, blockSizeByHeight));

    return {
      blockSize,
      width: BOARD_WIDTH * blockSize,
      height: BOARD_HEIGHT * blockSize,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const { blockSize, width, height } = calculateCanvasSize();

    canvas.width = width;
    canvas.height = height;
    setCanvasSize({ width, height });

    const theme = getTetrisTheme(themeIndex);

    // Fill background with theme color
    context.fillStyle = theme.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board - blocks with theme color
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell[0] !== 0) {
          const tetrominoKey = cell[0];
          if (TETROMINOS[tetrominoKey]) {
            context.fillStyle = theme.blockColor;
            context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
        }
      });
    });

    // Draw current falling piece - with theme color
    if (player && player.tetromino) {
      // Find the tetromino type from the shape array
      let tetrominoType: string | number | undefined;
      for (const row of player.tetromino) {
        for (const value of row) {
          if (value !== 0) {
            tetrominoType = value;
            break;
          }
        }
        if (tetrominoType) break;
      }

      if (tetrominoType && tetrominoType !== 0 && TETROMINOS[tetrominoType]) {
        context.fillStyle = theme.blockColor;
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              const drawX = (player.pos.x + x) * blockSize;
              const drawY = (player.pos.y + y) * blockSize;
              context.fillRect(drawX, drawY, blockSize, blockSize);
            }
          });
        });
      }
    }

    // Draw grid lines - 2px equivalent thick borders (drawn after blocks so they appear inside blocks too)
    const lineWidth = Math.max(2, blockSize * 0.1); // At least 2px or 10% of block size
    context.strokeStyle = theme.gridLineColor;
    context.lineWidth = lineWidth;

    // Draw vertical lines (columns)
    for (let x = 0; x <= BOARD_WIDTH; x++) {
      context.beginPath();
      context.moveTo(x * blockSize, 0);
      context.lineTo(x * blockSize, canvas.height);
      context.stroke();
    }

    // Draw horizontal lines (rows)
    for (let y = 0; y <= BOARD_HEIGHT; y++) {
      context.beginPath();
      context.moveTo(0, y * blockSize);
      context.lineTo(canvas.width, y * blockSize);
      context.stroke();
    }

  }, [board, player, canvasSize, themeIndex]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { width, height } = calculateCanvasSize();
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = getTetrisTheme(themeIndex);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {gameOver && (
        <div
          className="absolute z-20 text-center px-4 py-2 rounded"
          style={{
            backgroundColor: theme.backgroundColor + 'E6',
            color: theme.blockColor,
          }}
        >
          <h2 className="text-2xl font-bold font-mono">GAME OVER</h2>
          <button
            onClick={startGame}
            className="mt-4 px-6 py-2 rounded-lg border-2 transition font-mono"
            style={{
              backgroundColor: theme.blockColor,
              color: theme.backgroundColor,
              borderColor: theme.blockColor,
            }}
          >
            Press Space to Restart
          </button>
        </div>
      )}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Playable Tetris game"
        style={{ display: 'block', backgroundColor: theme.backgroundColor }}
      />
    </div>
  );
};

export default TetrisCanvas;
