"use client";
import { type Cell as CellType } from "@/lib/types/game";
import { GameState, useFirebase } from "@/hooks/useFirebase";
import { useEffect, useState } from "react";
import Cell from "../cell";

const MultiBoard = ({ code }: { code: string }) => {
  const { roomChanges } = useFirebase();
  const [game, setGame] = useState<GameState | null>(null);

  // Callback - Update Game State
  const updateGame = (state: GameState | null | undefined) => {
    setGame((state as GameState) ?? null);
  };

  // console.log("State: ", game);

  // Listen to room changes
  useEffect(() => {
    const unsub = roomChanges(code, updateGame);

    return () => {
      if (unsub) {
        unsub();
      }
    };
  }, [code, roomChanges]);

  // Create an array of 9 cells
  const cells: CellType[] = Array.from({ length: 9 }, (_, i) => ({
    uid: i,
    value: null,
    type: "big",
  }));

  return (
    <div className="w-full text-white container flex flex-col items-center justify-center h-full">
      {/* MultiBoard */}

      <div className="grid grid-cols-3 gap-2">
        {cells.map((cell) => (
          <Cell
            key={cell.uid}
            cell={cell}
            onClick={() => console.log(cell.uid)}
          >
            T
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default MultiBoard;
