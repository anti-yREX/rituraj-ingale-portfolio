
import { useState, useCallback, useEffect } from 'react';
import type { Player, Board, TetrominoShape } from '../types';
import { BOARD_WIDTH, createBoard, randomTetromino } from '../constants';

export const useTetris = () => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: [[0]],
    collided: false,
  });
  const [board, setBoard] = useState<Board>(createBoard());
  const [rowsCleared, setRowsCleared] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState<number | null>(null);

  const rotate = (matrix: TetrominoShape): TetrominoShape => {
    const rotatedTetromino = matrix.map((_, index) =>
      matrix.map(col => col[index]),
    );
    return rotatedTetromino.map(row => row.reverse());
  };

  const checkCollision = (
    playerToCheck: Player,
    boardToCheck: Board,
    { x: moveX, y: moveY }: { x: number; y: number }
  ): boolean => {
    for (let y = 0; y < playerToCheck.tetromino.length; y += 1) {
      for (let x = 0; x < playerToCheck.tetromino[y].length; x += 1) {
        if (playerToCheck.tetromino[y][x] !== 0) {
          if (
            !boardToCheck[y + playerToCheck.pos.y + moveY] ||
            !boardToCheck[y + playerToCheck.pos.y + moveY][x + playerToCheck.pos.x + moveX] ||
            boardToCheck[y + playerToCheck.pos.y + moveY][x + playerToCheck.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const resetPlayer = useCallback(() => {
    const newTetromino = randomTetromino();
    const tetrominoWidth = newTetromino.shape[0]?.length || 1;
    const maxX = BOARD_WIDTH - tetrominoWidth;
    const randomX = Math.floor(Math.random() * (maxX + 1));
    
    const newPlayer = {
      pos: { x: randomX, y: 0 },
      tetromino: newTetromino.shape,
      collided: false,
    };

    if (checkCollision(newPlayer, board, { x: 0, y: 0 })) {
      setGameOver(true);
      setDropTime(null);
    } else {
      setPlayer(newPlayer);
    }
  }, [board]);

  const playerRotate = (boardToCheck: Board): void => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, boardToCheck, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino); // Rotate back
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided?: boolean }): void => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided: collided !== undefined ? collided : prev.collided,
    }));
  };
  
  const movePlayer = (dir: number) => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const drop = useCallback(() => {
    setPlayer(currentPlayer => {
      if (!checkCollision(currentPlayer, board, { x: 0, y: 1 })) {
        return {
          ...currentPlayer,
          pos: { x: currentPlayer.pos.x, y: currentPlayer.pos.y + 1 },
          collided: false,
        };
      } else {
        if (currentPlayer.pos.y < 1) {
          setGameOver(true);
          setDropTime(null);
        }
        return {
          ...currentPlayer,
          collided: true,
        };
      }
    });
  }, [board]);

  const dropPlayer = useCallback(() => {
    setDropTime(null);
    drop();
  }, [drop]);
  
  const startGame = useCallback(() => {
    setBoard(createBoard());
    resetPlayer();
    setGameOver(false);
    setRowsCleared(0);
    setDropTime(1000);
  }, [resetPlayer]);

  useEffect(() => {
    const sweepRows = (newBoard: Board): Board =>
      newBoard.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newBoard[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as Board);

    if (player.collided) {
      const newBoard = board.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );

      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newBoard[y + player.pos.y][x + player.pos.x] = [
              value,
              'merged',
            ];
          }
        });
      });
      
      const sweptBoard = sweepRows(newBoard);
      setBoard(sweptBoard);
      resetPlayer();
    }
  }, [player.collided, board, player.pos, player.tetromino, resetPlayer]);


  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      drop();
    }, dropTime ?? 1000);

    return () => clearInterval(interval);
  }, [dropTime, gameOver, drop]);


  const handleKeyDown = ({ keyCode }: { keyCode: number }): void => {
    if (gameOver) {
        if (keyCode === 32) startGame();
        return;
    }

    if (keyCode === 37) { // Left arrow
      movePlayer(-1);
    } else if (keyCode === 39) { // Right arrow
      movePlayer(1);
    } else if (keyCode === 40) { // Down arrow
      dropPlayer();
    } else if (keyCode === 38) { // Up arrow (rotate)
      playerRotate(board);
    }
  };

  return { board, handleKeyDown, gameOver, startGame, player, rowsCleared };
};
