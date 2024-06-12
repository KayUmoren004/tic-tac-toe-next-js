import {
  type Cell as CellType,
  type SmallBoard as SmallBoardType,
} from "@/lib/types/game";
import Cell from "./cell";
import { useFirebase } from "@/hooks/useFirebase";

const SmallBoard = ({
  cells,
  winner,
}: {
  cells: SmallBoardType["cells"];
  winner: SmallBoardType["winner"] | null;
}) => {
  return (
    <div className="grid grid-cols-3 bg-black">
      {cells.map((cell, index) => {
        const cellDetails = {
          ...cell,
          uid: index,
        };
        return <Cell key={index} cell={cellDetails} />;
      })}
    </div>
  );
};

export default SmallBoard;
