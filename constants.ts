
import type { TetrominoShape } from './types';

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

export type ColorScheme = {
  mainContent: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    sectionBorder: string;
  };
  tetris: {
    backgroundColor: string;
    blockColor: string;
    gridLineColor: string;
  };
};

export const COLOR_SCHEMES: ColorScheme[] = [
  {
    // Black/White theme
    mainContent: {
      bg: 'bg-black/50',
      border: 'border-gray-800/50',
      text: 'text-gray-100',
      accent: 'text-purple-400',
      sectionBorder: 'border-purple-500/30',
    },
    tetris: {
      backgroundColor: '#FFFFFF',
      blockColor: '#000000',
      gridLineColor: '#FFFFFF',
    },
  },
  {
    // Purple theme
    mainContent: {
      bg: 'bg-purple-900/30',
      border: 'border-purple-700/50',
      text: 'text-purple-100',
      accent: 'text-purple-300',
      sectionBorder: 'border-purple-400/50',
    },
    tetris: {
      backgroundColor: '#F3E8FF',
      blockColor: '#9333EA',
      gridLineColor: '#F3E8FF',
    },
  },
  {
    // Blue theme
    mainContent: {
      bg: 'bg-blue-900/30',
      border: 'border-blue-700/50',
      text: 'text-blue-100',
      accent: 'text-blue-300',
      sectionBorder: 'border-blue-400/50',
    },
    tetris: {
      backgroundColor: '#EFF6FF',
      blockColor: '#3B82F6',
      gridLineColor: '#EFF6FF',
    },
  },
  {
    // Green theme
    mainContent: {
      bg: 'bg-green-900/30',
      border: 'border-green-700/50',
      text: 'text-green-100',
      accent: 'text-green-300',
      sectionBorder: 'border-green-400/50',
    },
    tetris: {
      backgroundColor: '#F0FDF4',
      blockColor: '#22C55E',
      gridLineColor: '#F0FDF4',
    },
  },
  {
    // Pink theme
    mainContent: {
      bg: 'bg-pink-900/30',
      border: 'border-pink-700/50',
      text: 'text-pink-100',
      accent: 'text-pink-300',
      sectionBorder: 'border-pink-400/50',
    },
    tetris: {
      backgroundColor: '#FDF2F8',
      blockColor: '#EC4899',
      gridLineColor: '#FDF2F8',
    },
  },
  {
    // Cyan theme
    mainContent: {
      bg: 'bg-cyan-900/30',
      border: 'border-cyan-700/50',
      text: 'text-cyan-100',
      accent: 'text-cyan-300',
      sectionBorder: 'border-cyan-400/50',
    },
    tetris: {
      backgroundColor: '#ECFEFF',
      blockColor: '#06B6D4',
      gridLineColor: '#ECFEFF',
    },
  },
  {
    // Amber theme
    mainContent: {
      bg: 'bg-amber-900/30',
      border: 'border-amber-700/50',
      text: 'text-amber-100',
      accent: 'text-amber-300',
      sectionBorder: 'border-amber-400/50',
    },
    tetris: {
      backgroundColor: '#FFFBEB',
      blockColor: '#F59E0B',
      gridLineColor: '#FFFBEB',
    },
  },
  {
    // Indigo theme
    mainContent: {
      bg: 'bg-indigo-900/30',
      border: 'border-indigo-700/50',
      text: 'text-indigo-100',
      accent: 'text-indigo-300',
      sectionBorder: 'border-indigo-400/50',
    },
    tetris: {
      backgroundColor: '#EEF2FF',
      blockColor: '#6366F1',
      gridLineColor: '#EEF2FF',
    },
  },
];

export const getColorScheme = (index: number): ColorScheme => {
  return COLOR_SCHEMES[index % COLOR_SCHEMES.length];
};
