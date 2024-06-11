import { type Cell as CellType } from "@/lib/types/game";

const Cell = ({ cell, onClick }: { cell: CellType; onClick: () => void }) => {
  return (
    <div className="" onClick={onClick}>
      {cell.value}
    </div>
  );
};

export default Cell;
