import { type Cell as CellType } from "@/lib/types/game";
import { getSmallBorder, getBigBorder } from "@/lib/constants";
import { cva } from "class-variance-authority";
import { MouseEventHandler } from "react";

const base =
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-4xl font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const big = "size-20 md:size-40  lg:size-60 bg-white";
const small = "size-4 md:size-8 lg:size-16 bg-white";

const Cell = ({
  cell,
  children,
}: {
  cell: CellType;
  children?: React.ReactNode;
}) => {
  const size = cell.type === "big" ? big : small;
  const border =
    cell.type === "big"
      ? getBigBorder(parseInt(cell.uid.toString()))
      : getSmallBorder(parseInt(cell.uid.toString()));

  // Cell Occupied
  const occupiedStyle =
    cell.value !== null && cell.type !== "big"
      ? "bg-gray-200 cursor-not-allowed"
      : "";

  // Cell Value Color
  const xColor = "text-blue-500";
  const oColor = "text-pink-500";
  const cellColor = cell.value === "X" ? xColor : oColor;

  return (
    <div
      className={`${base} ${size} ${border} ${occupiedStyle} ${cellColor}`}
      onClick={async () => cell.onClick?.()}
    >
      {children ? children : cell.value}
    </div>
  );
};

export default Cell;
