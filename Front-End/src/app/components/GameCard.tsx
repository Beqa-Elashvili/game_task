import { useState } from "react";
import { Game } from "../types/game";
import Image from "next/image";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const [showVideo, setShowVideo] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowVideo(true);
    }, 1000);
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
        className=" relative group cursor-pointer bg-[#162231] rounded-lg transition-transform duration-300 hover:scale-105 overflow-hidden w-full max-w-[350px] mx-auto"
      >
        <div className="relative w-full aspect-video bg-gray-200 overflow-hidden rounded-lg">
          {!showVideo ? (
            <Image
              width={500}
              height={500}
              src={game.image}
              alt={game.name}
              className="w-full h-60 object-cover"
            />
          ) : (
            <>
              <video
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                className="absolute h-60  w-full  object-cover transition-all duration-500"
                src={game.videoUrl}
              />
              {loadingVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
                </div>
              )}
            </>
          )}
        </div>
        <div
          className={`justify-center items-center absolute   ${
            showVideo ? "translate-y-0" : "translate-y-10/12"
          }
           z-10 inset-0 text-white p-2 flex flex-col gap-1 transition-transform duration-500`}
        >
          <h1 className="font-semibold truncate">{game.name}</h1>
          <p className="text-gray-300 text-sm truncate">{game.provider}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
