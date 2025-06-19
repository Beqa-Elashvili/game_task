import { Game } from "../types/game";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => (
  <div className="relative rounded hover:cursor-pointer group">
    <img
      src={game.image}
      alt={game.name}
      className="md:w-[150px] md:h-[200px] rounded"
    />
    <div className="absolute rounded text-center inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition">
      <p>{game.name}</p>
      <p className="text-sm">{game.provider}</p>
    </div>
  </div>
);

export default GameCard;
