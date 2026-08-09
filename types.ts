
export interface SkillCategory {
  label: string;
  description: string;
  items: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  about: string;
  skills: string[];
  skillCategories: SkillCategory[];
  footer: {
    contact: {
      email: string;
      linkedin: string;
      github: string;
    };
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
