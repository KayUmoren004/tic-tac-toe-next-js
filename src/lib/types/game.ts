export type Player = {
  name: string;
  symbol: "X" | "O" | null;
};

export type Cell = {
  uid: string | number;
  value: "X" | "O" | null;
  enabled?: boolean;
  textColor?: string;
  type: "small" | "big";
  onClick?: (bigCell?: Cell) => Promise<void>;
};

export type SmallBoard = {
  cells: Cell[]; // 9 cells for each small board
  winner: "X" | "O" | "Tie" | null;
};

export type UltimateBoard = {
  boards: SmallBoard[]; // 9 small boards
  winner: "X" | "O" | "Tie" | null;
  currentBoard: number | null; // Index of the current small board to play in
};

export type GameState = {
  ultimateBoard: UltimateBoard;
  players: Player[];
  currentPlayerIndex: number;
  nextPlayerIndex: number;
};

// Example initialization
const initialGameState: GameState = {
  ultimateBoard: {
    boards: Array(9).fill({
      cells: Array(9).fill({ value: null }),
      winner: null,
    }),
    winner: null,
    currentBoard: null,
  },
  players: [
    { name: "Player 1", symbol: "X" },
    { name: "Player 2", symbol: "O" },
  ],
  currentPlayerIndex: 0,
  nextPlayerIndex: 1,
};
