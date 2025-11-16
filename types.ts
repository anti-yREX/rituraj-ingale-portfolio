
export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  footer: {
    note: string;
    contact: string;
  };
}

// Tetris Types
export type TetrominoShape = (number | string)[][];
export type Board = [string | number, string][][];

export type Player = {
  pos: { x: number; y: number };
  tetromino: TetrominoShape;
  collided: boolean;
};
