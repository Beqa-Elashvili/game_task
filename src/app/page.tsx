import MainLayout from "./mainLayout/layout";
import GameList from "./components/GameList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import { fetchGames } from "./utils/api";
import { Game, PaginationMeta, FiltersApplied } from "@/app/types/game";

interface HomeData {
  data: Game[];
  pagination: PaginationMeta;
  filters_applied: FiltersApplied;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const { data, pagination, filters_applied }: HomeData = await fetchGames(
    searchParams
  );

  return (
    <MainLayout>
      <div className="container p-4">
        <SearchBar />
        {/* <FilterBar filters={filters_applied} /> */}
        <GameList games={data} />
        {/* <Pagination pagination={pagination} /> */}
      </div>
    </MainLayout>
  );
}
