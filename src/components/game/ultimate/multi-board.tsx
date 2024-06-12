"use client";
import { type Cell as CellType } from "@/lib/types/game";
import { GameState, useFirebase } from "@/hooks/useFirebase";
import { useEffect, useState } from "react";
import Cell from "../cell";
import SmallBoard from "../small-board";

const MultiBoard = ({ code, name }: { code: string; name: string | null }) => {
  const { roomChanges, sendMove } = useFirebase();
  const [game, setGame] = useState<GameState | null>(null);

  // Player Details
  const player = game?.players.find((p) => p.name === name);

  // Player moves - find all moves where key is player symbol
  const playerMiniMoves = Object.keys(game?.mini_moves ?? {}).filter(
    (key) => key === player?.symbol
  );
  const playerBigMoves = Object.keys(game?.big_moves ?? {}).filter(
    (key) => key === player?.symbol
  );

  // Callback - Update Game State
  const updateGame = (state: GameState | null | undefined) => {
    setGame((state as GameState) ?? null);
  };

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
  const bigCells: CellType[] = Array.from(
    { length: 9 },
    (_, i) =>
      ({
        uid: i,
        value: playerBigMoves.includes(i.toString()) ? player?.symbol : null,
        type: "big",
      } as CellType)
  );

  return (
    <div className="w-full text-black container flex flex-col items-center justify-center h-full">
      {/* MultiBoard */}

      <div className="grid grid-cols-3 ">
        {bigCells.map((cell) => (
          <Cell key={cell.uid} cell={cell}>
            <SmallBoard
              cells={Array.from(
                { length: 9 },
                (_, i) =>
                  ({
                    uid: i,
                    value: playerMiniMoves.includes(i.toString())
                      ? player?.symbol
                      : null,
                    type: "small",
                    onClick: async () => {
                      console.log({
                        location: cell.uid,
                        smallcell: i,
                      });

                      // Send Move
                      await sendMove(
                        code,
                        {
                          uid: cell?.uid as number,
                          value: player?.symbol ?? null,
                          type: "big",
                        },
                        {
                          uid: i,
                          value: player?.symbol ?? null,
                          type: "small",
                        }
                      );
                    },
                  } as CellType)
              )}
              winner={null}
            />
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default MultiBoard;
