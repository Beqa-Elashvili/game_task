import { Game } from "../types/game";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => (
  <div className="relative group">
    <img src={game.image} alt={game.name} className="w-full rounded" />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white transition">
      <p>{game.name}</p>
      <p className="text-sm">{game.provider}</p>
    </div>
  </div>
);

export default GameCard;
