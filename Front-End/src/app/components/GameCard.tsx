import { useState } from "react";
import { Game } from "../types/game";
import Image from "next/image";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
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
    <div>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-pointer bg-[#162231] rounded-lg transition-transform duration-300 hover:scale-105 overflow-hidden w-full max-w-[350px] mx-auto"
      >
        <div className="relative w-full aspect-video bg-gray-200 overflow-hidden rounded-lg">
          {!showVideo ? (
            <Image
              width={500}
              height={500}
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500"
              src={game.videoUrl}
            />
          )}
        </div>

        <div
          className={`bg-[#162231] text-white p-2 flex flex-col gap-1 transition-transform duration-500 `}
        >
          <h1 className="font-semibold truncate">{game.name}</h1>
          <p className="text-gray-300 text-sm truncate">{game.provider}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
