"use client";
import { useState } from "react";
import Image from "next/image";
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
        <GamePreview key={game.identifier} game={game} />
      ))}
    </div>
  );
}

function GamePreview({ game }: { game: Game }) {
  const [showVideo, setShowVideo] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 2000); // 2 seconds delay
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setShowVideo(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="snap-start min-w-[30.3333%] sm:min-w-[25%] md:min-w-[20%] lg:min-w-[12.5%]"
    >
      <GameCard game={game} />
      <div className="rounded-lg  cursor-pointer p-2  mt-5 relative w-[500px] h-[400px]">
        {!showVideo ? (
          <Image
            src="https://plus.unsplash.com/premium_photo-1681506669115-cb6b2d30dbc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXJsfGVufDB8fDB8fHww"
            fill
            className=" w-[500px] h-[400px] rounded"
            alt="game"
          />
        ) : (
          <video
            autoPlay
            controls
            loop
            className="absolute inset-0 w-full h-full object-cover rounded"
            src="https://media.rawg.io/media/stories-640/a31/a3184b28f9920fc2e69094fdcac75ef7.mp4"
          />
        )}
      </div>
    </div>
  );
}
