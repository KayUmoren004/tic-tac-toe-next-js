import {
  type Cell as CellType,
  type SmallBoard as SmallBoardType,
} from "@/lib/types/game";
import Cell from "./cell";

const SmallBoard = ({
  cells,
  winner,
}: {
  cells: SmallBoardType["cells"];
  winner: SmallBoardType["winner"];
}) => {
  return (
    <div className="">
      {cells.map((cell, index) => (
        <Cell
          key={index}
          cell={{
            uid: index,
            ...cell,
          }}
          onClick={() => {
            console.log("Cell" + index);
          }}
        />
      ))}
    </div>
  );
};
