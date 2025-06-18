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
      className="flex overflow-x-auto scroo space-x-4 snap-x snap-mandatory scroll-smooth"
    >
      {games.map((game) => (
        <div key={game.identifier} className="min-w-[12.5%] snap-start">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}
