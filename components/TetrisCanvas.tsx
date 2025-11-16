
import React, { useRef, useEffect, useState } from 'react';
import { useTetris } from '../hooks/useTetris';
import { TETROMINOS, BOARD_WIDTH, BOARD_HEIGHT, getColorScheme } from '../constants';

interface TetrisCanvasProps {
  onScoreChange?: (score: number) => void;
  colorSchemeIndex: number;
}

const TetrisCanvas: React.FC<TetrisCanvasProps> = ({ onScoreChange, colorSchemeIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const { board, handleKeyDown, gameOver, startGame, player, rowsCleared } = useTetris();

  useEffect(() => {
    if (onScoreChange) {
      onScoreChange(rowsCleared);
    }
  }, [rowsCleared, onScoreChange]);

  // Auto-start game on mount
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
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

    // Get current color scheme
    const colorScheme = getColorScheme(colorSchemeIndex);

    // Fill background with scheme color
    context.fillStyle = colorScheme.tetris.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board - blocks with scheme color
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell[0] !== 0) {
          const tetrominoKey = cell[0];
          if (TETROMINOS[tetrominoKey]) {
            context.fillStyle = colorScheme.tetris.blockColor;
            context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
          }
        }
      });
    });

    // Draw current falling piece - with scheme color
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
        context.fillStyle = colorScheme.tetris.blockColor;
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
    context.strokeStyle = colorScheme.tetris.gridLineColor;
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

  }, [board, player, canvasSize, colorSchemeIndex]);

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

  const colorScheme = getColorScheme(colorSchemeIndex);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-end pr-4 md:pr-8 opacity-30">
        {gameOver && (
            <div className="absolute z-20 text-center right-4 md:right-8 px-4 py-2 rounded" style={{ 
              backgroundColor: colorScheme.tetris.backgroundColor + 'E6',
              color: colorScheme.tetris.blockColor 
            }}>
                <h2 className="text-4xl font-bold">GAME OVER</h2>
                <button 
                    onClick={startGame}
                    className="mt-4 px-6 py-2 rounded-lg border-2 transition"
                    style={{
                      backgroundColor: colorScheme.tetris.blockColor,
                      color: colorScheme.tetris.backgroundColor,
                      borderColor: colorScheme.tetris.blockColor
                    }}
                >
                    Press Space to Restart
                </button>
            </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'block', backgroundColor: colorScheme.tetris.backgroundColor }} />
    </div>
  );
};

export default TetrisCanvas;
