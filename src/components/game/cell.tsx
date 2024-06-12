import { type Cell as CellType } from "@/lib/types/game";
import { cva } from "class-variance-authority";

const base =
  "cursor-pointer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
const big = "size-20 md:size-40 lg:size-60";
const small = "size-10 md:size-20 lg:size-30";

const Cell = ({
  cell,
  onClick,
  children,
}: {
  cell: CellType;
  onClick: () => void;
  children?: React.ReactNode;
}) => {
  const size = cell.type === "big" ? big : small;
  return (
    <div className={`bg-blue-400 ${base} ${size}`} onClick={onClick}>
      {children ? children : cell.uid}
    </div>
  );
};

export default Cell;
