import { v4 as uuidv4 } from "uuid";

export interface Category {
  id: string;
  name?: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: uuidv4(),
    icon: "/menu_image.png",
  },
  {
    name: "Promotions",
    id: uuidv4(),
    icon: "/promotions_image.png",
  },
  {
    name: "VIP Club",
    id: uuidv4(),
    icon: "/vip_club_image.png",
  },
  {
    name: "Tournaments",
    id: uuidv4(),
    icon: "/tournaments_image.png",
  },
  {
    name: "Slots",
    id: uuidv4(),
    icon: "/slots_image.png",
  },
  {
    name: "Blackjack",
    id: uuidv4(),
    icon: "/blackjack_image.png",
  },
  {
    name: "Roullete",
    id: uuidv4(),
    icon: "/roulette_image.png",
  },

  {
    name: "Baccarat",
    id: uuidv4(),
    icon: "/table_games_image.png",
  },
  {
    name: "Live Dealer",
    id: uuidv4(),
    icon: "/live_dealers_image.png",
  },
  {
    name: "Crash",
    id: uuidv4(),
    icon: "/crash_image.png",
  },
  {
    name: "Dice",
    id: uuidv4(),
    icon: "/dice_image.png",
  },
  {
    name: "Video Poker",
    id: uuidv4(),
    icon: "/video_poker_image.png",
  },
  {
    name: "Favorites",
    id: uuidv4(),
    icon: "/favorites_image.png",
  },
  {
    name: "Recent",
    id: uuidv4(),
    icon: "/recent_image.png",
  },
  {
    name: "Collections",
    id: uuidv4(),
    icon: "/vec.png",
  },
  {
    name: "Providers",
    id: uuidv4(),
    icon: "/Group.png",
  },
  {
    name: "Support",
    id: uuidv4(),
    icon: "/support_image.png",
  },
  {
    name: "English",
    id: uuidv4(),
    icon: "/language_image.png",
  },
];
