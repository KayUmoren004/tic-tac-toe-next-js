const Game = ({
  params: { code },
}: {
  params: {
    code: string;
  };
}) => {
  return (
    <div>
      <h1>Game - {code}</h1>
    </div>
  );
};

export default Game;
