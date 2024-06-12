import { GameState } from "@/hooks/useFirebase";

type GameFooterProps = {
  state: GameState | null;
};

const GameFooter = ({ state }: GameFooterProps) => {
  return (
    <div className="text-white text-xs  w-full h-10 flex flex-row items-center py-2 px-6 justify-center">
      Godson Umoren - 2024
    </div>
  );
};

export default GameFooter;
