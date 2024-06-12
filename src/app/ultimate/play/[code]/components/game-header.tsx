import { GameState } from "@/hooks/useFirebase";

type GameHeaderProps = {
  state: GameState | null;
};

const GameHeader = ({ state }: GameHeaderProps) => {
  return (
    <div className="text-white w-full h-10 flex flex-row items-center py-2 px-6">
      Header
    </div>
  );
};

export default GameHeader;
