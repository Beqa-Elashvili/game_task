import CategoryCarousel from "./components/CategoryCarousel";
import { fetchGames } from "./utils/api";
import { DashboardCategories as categories } from "./constants/categories";
import ProvidersCarousel from "./components/Providers";
import ImagesComp from "./components/ImagesComp";

export default async function Home() {
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
    <div className="overflow-hidden min-h-screen h-max">
      {categoryData.map(({ name, icon, data, pagination }) => (
        <CategoryCarousel
          key={name}
          category={name}
          icon={icon}
          initialData={data}
          initialPagination={pagination}
        />
      ))}
      <ProvidersCarousel />
      <ImagesComp />

      {/* Footer only contains photos because I didn't have time */}
    </div>
  );
}
