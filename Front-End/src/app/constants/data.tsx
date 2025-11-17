import { v4 as uuidv4 } from "uuid";
import { Home, Search, MessageCircle, ChartBar, Menu } from "lucide-react";
import {
  LucideIcon,
  Bitcoin,
  BadgeCent,
  BadgeDollarSign,
  BadgeEuro,
  BadgeIndianRupee,
  Badge,
  JapaneseYen,
  BadgePoundSterling,
  BadgeRussianRuble,
  BadgeSwissFranc,
} from "lucide-react";

export interface Category {
  id: string;
  name?: string;
  icon: string;
}

export interface MobileFooterItem {
  id: string;
  title?: string;
  Icon: LucideIcon;
}
export interface TFooterData {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}

export const currencyIcons: LucideIcon[] = [
  Bitcoin,
  BadgeCent,
  BadgeDollarSign,
  BadgeEuro,
  BadgeIndianRupee,
  Badge,
  JapaneseYen,
  BadgePoundSterling,
  BadgeRussianRuble,
  BadgeSwissFranc,
];

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

export const DashboardCategories = [
  { name: "featured-games", icon: "/game_row_header_image.png" },
  { name: "new-releases", icon: "/game_row_header_image2.png" },
  { name: "hot-games", icon: "/game_row_header_image3.png" },
  { name: "bonus-buy", icon: "/game_row_header_image4.png" },
  { name: "live", icon: "/game_row_header_image5.png" },
  // { name: "slots", icon: "/game_row_header_image5.png" },
  // { name: "blackjack", icon: "/game_row_header_image5.png" },
  // { name: "roulette", icon: "/game_row_header_image5.png" },
  // { name: "baccarat", icon: "/game_row_header_image5.png" },
  // { name: "crash", icon: "/game_row_header_image5.png" },
  // { name: "dice", icon: "/game_row_header_image5.png" },
  // { name: "video-poker", icon: "/game_row_header_image5.png" },
  // { name: "books", icon: "/game_row_header_image5.png" },
  // { name: "fruits", icon: "/game_row_header_image5.png" },
  // { name: "hot", icon: "/game_row_header_image5.png" },
];

export const CategoriesChoice = [
  { name: "Lobby", icon: "/game_row_header_image.png" },
  { name: "Blackjack", icon: "/blackjack_image.png" },
  { name: "roulette", icon: "/game_row_header_image5.png" },
  { name: "live", icon: "/live_dealers_image.png" },
  { name: "baccarat", icon: "/table_games_image.png" },
  { name: "crash", icon: "/crash_image.png" },
  { name: "dice", icon: "/dice_image.png" },
  { name: "video-poker", icon: "/video_poker_image.png" },
  { name: "fruits", icon: "/game_row_header_image5.png" },
  { name: "books", icon: "/game_row_header_image5.png" },
  { name: "bonus-buy", icon: "/game_row_header_image4.png" },
];

export const MobileFooterComp: MobileFooterItem[] = [
  {
    id: uuidv4(),
    title: "Home",
    Icon: Home,
  },
  {
    id: uuidv4(),
    title: "Search",
    Icon: Search,
  },
  {
    id: uuidv4(),
    Icon: MessageCircle,
  },
  {
    id: uuidv4(),
    title: "Chat",
    Icon: ChartBar,
  },
  {
    id: uuidv4(),
    title: "Menu",
    Icon: Menu,
  },
];

export const Providers: { icon: string }[] = [
  {
    icon: "/logo 1.png",
  },
  {
    icon: "/media_f068b3834fe0b556b6a9d5efa9a8ea5e838d33d280 1.png",
  },
  {
    icon: "/BG.png",
  },
  {
    icon: "/media_f0f6393cc844b0a22c0c21bb799e576e31dbcc8f71 1.png",
  },
  {
    icon: "/idG8Cz4H7e_logos 1.png",
  },
  {
    icon: "/Group 2131328624.png",
  },
  {
    icon: "/qs.png",
  },
];

export const footerData: TFooterData[] = [
  {
    title: "Promotions",
    items: [
      { label: "Welcome Bonus", href: "/#" },
      { label: "Cash Back Deals", href: "/#" },
      { label: "Weekly Cashback", href: "/#" },
      { label: "Tournaments", href: "/#" },
      { label: "VIP Club", href: "/#" },
    ],
  },
  {
    title: "Banking",
    items: [
      { label: "Deposit Options", href: "/#" },
      { label: "Withdraw Options", href: "/#" },
      { label: "Refund Policy", href: "/#" },
      { label: "Payment Security", href: "/#" },
      { label: "AML Policy", href: "/#" },
    ],
  },
  {
    title: "Casiono",
    items: [
      { label: "Terms & Conditions", href: "/#" },
      { label: "Privacy Policy", href: "/#" },
      { label: "Bonus Terms", href: "/#" },
      { label: "Affiliate Program", href: "/#" },
      { label: "About CASIONO", href: "/#" },
    ],
  },
  {
    title: "Costumer Care",
    items: [
      { label: "Live Chat", href: "/#" },
      { label: "Phone Support", href: "/#" },
      { label: "Email Support", href: "/#" },
      { label: "Help Desk", href: "/#" },
      { label: "Resposible Gaming", href: "/#" },
    ],
  },
];
