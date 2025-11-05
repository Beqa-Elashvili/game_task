import { Game } from "../types/game";
import GameCard from "./GameCard";

export default function GameList({
  games,
  scrollRef,
}: {
  games: Game[];
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}) {
  if (!games.length) {
    return <p className="text-center text-gray-500">No games found.</p>;
  }

  return (
    <div
      ref={scrollRef}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      className="flex overflow-x-auto scrool space-x-0 sm:space-x-4 snap-x snap-mandatory scroll-smooth"
    >
      {games.map((game: Game) => (
        <div
          key={game.id}
          className="snap-start p-2 min-w-[50%] sm:min-w-[45%] md:min-w-[30%]"
        >
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}
