import CategoryCarousel from "./components/CategoryCarousel";
import { fetchGames, fetchNews } from "./utils/api";
import { DashboardCategories as categories } from "./constants/categories";
import ProvidersCarousel from "./components/Providers";
import ImagesComp from "./components/ImagesComp";
import NewsCarousel from "./components/NewsCarousel";

export default async function Home() {
  async function GetNews() {
    const resp = await fetchNews();
    return {
      id: resp.data.id,
      name: "სიახლეები",
      data: resp.data,
      pagination: resp.meta,
    };
  }

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
  const news = await GetNews();
  console.log(news);

  return (
    <div className="overflow-hidden min-h-screen h-max">
      <NewsCarousel
        title="სიახლეები"
        initialData={news.data}
        initialPagination={news.pagination}
      />
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
    </div>
  );
}
