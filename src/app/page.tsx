import MainLayout from "./mainLayout/layout";
import GameList from "./components/GameList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import CategoryCarousel from "./components/CategoryCarousel";
import { fetchGames } from "./utils/api";

export default async function Home() {
  const categories = [
    { name: "featured-games", icon: "/game_row_header_image.png" },
    { name: "new-releases", icon: "/game_row_header_image2.png" },
    { name: "hot-games", icon: "/game_row_header_image3.png" },
    { name: "bonus-buy", icon: "/game_row_header_image4.png" },
    { name: "live", icon: "/game_row_header_image5.png" },
    { name: "slots", icon: "/game_row_header_image5.png" },
    { name: "blackjack", icon: "/game_row_header_image5.png" },
    { name: "roulette", icon: "/game_row_header_image5.png" },
    { name: "baccarat", icon: "/game_row_header_image5.png" },
    { name: "crash", icon: "/game_row_header_image5.png" },
    { name: "dice", icon: "/game_row_header_image5.png" },
    { name: "video-poker", icon: "/game_row_header_image5.png" },
    { name: "books", icon: "/game_row_header_image5.png" },
    { name: "fruits", icon: "/game_row_header_image5.png" },
    { name: "hot", icon: "/game_row_header_image5.png" },
  ];

  async function fetchAllCategoriesPage1() {
    const results = await Promise.all(
      categories.map(async (category) => {
        const res = await fetchGames({
          category: category.name,
          page: "1",
          limit: "10",
        });
        return {
          name: category.name,
          icon: category.icon,
          data: res.data,
          pagination: res.pagination,
        };
      })
    );
    return results;
  }

  const categoryData = await fetchAllCategoriesPage1();

  return (
    <MainLayout>
      <div className="overflow-hidden">
        {/* <SearchBar /> */}
        {categoryData.map(({ name, icon, data, pagination }) => (
          <CategoryCarousel
            key={name}
            category={name}
            icon={icon}
            initialData={data}
            initialPagination={pagination}
          />
        ))}
      </div>
    </MainLayout>
  );
}
