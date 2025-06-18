import { Game } from "../types/game";
import GameCard from "./GameCard";

interface Props {
  games: Game[];
}

const GameList = ({ games = [] }: Props) => {
  if (games.length === 0) {
    return <p className="text-center text-gray-500">No games found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {games.map((game) => (
        <GameCard key={game.identifier} game={game} />
      ))}
    </div>
  );
};

export default GameList;
