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
        <div
          key={game.identifier}
          className="snap-start min-w-[30.3333%] sm:min-w-[25%] md:min-w-[20%] lg:min-w-[12.5%]"
        >
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
}
