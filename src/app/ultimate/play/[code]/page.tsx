"use client";

import { GameState, useFirebase } from "@/hooks/useFirebase";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GameHeader from "./components/game-header";
import GameFooter from "./components/game-footer";
import MultiBoard from "@/components/game/ultimate/multi-board";

const Game = ({
  params: { code },
}: {
  params: {
    code: string;
  };
}) => {
  const qParams = useSearchParams();
  const name = qParams.get("username");

  return (
    <>
      {/* <GameHeader state={game} /> */}
      <div className="bg-white h-full w-full flex flex-col items-center justify-center">
        <div className="flex flex-row gap-4 mb-10">
          <p className="text-white">Game - {code}</p>
          <p className="text-white">User - {name}</p>
        </div>
        <MultiBoard code={code} name={name} />
      </div>
      <GameFooter state={null} />
    </>
  );
};

export default Game;
