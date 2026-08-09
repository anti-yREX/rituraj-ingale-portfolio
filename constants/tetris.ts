
import type { TetrominoShape } from '../types';

export const BOARD_WIDTH = 12;
export const BOARD_HEIGHT = 20;

export const createBoard = (): (string | number)[][] =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill([0, 'clear']));

type Tetrominos = {
  [key: string | number]: {
    shape: TetrominoShape;
    color: string;
  };
};

export const TETROMINOS: Tetrominos = {
  0: { shape: [[0]], color: 'rgba(0,0,0,0)' }, // Empty shape
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '#000000', // Solid black
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '#000000', // Solid black
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '#000000', // Solid black
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '#000000', // Solid black
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '#000000', // Solid black
  },
  T: {
    shape: [
      [0, 0, 0],
      ['T', 'T', 'T'],
      [0, 'T', 0],
    ],
    color: '#000000', // Solid black
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '#000000', // Solid black
  },
};

export const randomTetromino = (): { shape: TetrominoShape; color: string } => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export type TetrisTheme = {
  backgroundColor: string;
  blockColor: string;
  gridLineColor: string;
};

export const TETRIS_THEMES: TetrisTheme[] = [
  { backgroundColor: '#0a0a0a', blockColor: '#22d3ee', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#a78bfa', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#e879f9', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#34d399', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#f472b6', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#38bdf8', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#fbbf24', gridLineColor: '#0a0a0a' },
  { backgroundColor: '#0a0a0a', blockColor: '#818cf8', gridLineColor: '#0a0a0a' },
];

export const getTetrisTheme = (index: number): TetrisTheme =>
  TETRIS_THEMES[index % TETRIS_THEMES.length];
