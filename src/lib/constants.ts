// Boards
export const SMALLBOARD_CELL_COUNT = 9;
export const ULTIMATEBOARD_CELL_COUNT = 9;

// Winning conditions
export const WINNING_CONDITIONS = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// Borders
const BOTTOM = [0, 1, 2, 3, 4, 5];
const TOP = [3, 4, 5, 6, 7, 8];
const LEFT = [1, 4, 7, 2, 5, 8];
const RIGHT = [0, 3, 6, 1, 4, 7];
export const BORDERS = { TOP, BOTTOM, LEFT, RIGHT };

// Given an index, return the border [return a string of border with side appended to it, example if 2 was the input, return "border-b border-r $BORDER_WIDTH"]
export const getSmallBorder = (index: number): string => {
  let borderStr = "border-black";

  if (TOP.includes(index)) {
    borderStr += ` border-t`;
  }
  if (BOTTOM.includes(index)) {
    borderStr += ` border-b`;
  }
  if (LEFT.includes(index)) {
    borderStr += ` border-l`;
  }
  if (RIGHT.includes(index)) {
    borderStr += ` border-r`;
  }

  if (!borderStr) {
    console.error("Invalid index");
  }

  return borderStr;
};

// Get big border but the only difference is that the border width is 4px: Eg "border-b-4 border-r-4"
// Function for big borders with 4px width
export const getBigBorder = (index: number): string => {
  let borderStr = "border-black";

  if (TOP.includes(index)) {
    borderStr += ` border-t-2`;
  }
  if (BOTTOM.includes(index)) {
    borderStr += ` border-b-2`;
  }
  if (LEFT.includes(index)) {
    borderStr += ` border-l-2`;
  }
  if (RIGHT.includes(index)) {
    borderStr += ` border-r-2`;
  }

  if (!borderStr) {
    console.error("Invalid index");
  }

  return borderStr;
};
