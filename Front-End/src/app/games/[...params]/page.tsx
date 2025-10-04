"use client";

import GameCard from "@/app/components/GameCard";
import { useGlobalProvider } from "@/app/provider/globalProvider";
import { fetchGames } from "@/app/utils/api";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo, useRef, use } from "react";

type GamesParams = {
  params: Promise<{
    params: string[];
  }>;
};

function Page({ params }: GamesParams) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const resolvedParams = use(params);

  const segments = resolvedParams?.params || [];
  const { setOptions } = useGlobalProvider();

  const { collections, providers } = useMemo(() => {
    const collections: string[] = [];
    const providers: string[] = [];

    let currentType: "collections" | "providers" | null = null;

    for (const segment of segments) {
      if (segment === "collections" || segment === "providers") {
        currentType = segment;
      } else if (currentType === "collections") {
        collections.push(segment);
      } else if (currentType === "providers") {
        providers.push(segment);
      }
    }

    return { collections, providers };
  }, [segments]);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [games, setGames] = useState<any[]>([]);
  const [filtersApplied, setFiltersApplied] = useState({
    providers: [] as string[],
    categories: [] as string[],
    search: "",
  });

  const [pagination, setPagination] = useState({
    current_page: 1,
    has_next_page: false,
    has_prev_page: false,
    next_page: null as number | null,
    prev_page: null as number | null,
    total_pages: 1,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const lastUrl = useRef("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        // Filter API values
        const filteredCollections = collections.filter(
          (c) => c !== "all-collections" && c !== "empty"
        );
        const filteredProviders = providers.filter(
          (p) => p !== "all-providers" && p !== "empty"
        );

        const query: any = { limit: 20, page: currentPage };
        if (filteredCollections.length) query.category = filteredCollections;
        if (filteredProviders.length) query.provider = filteredProviders;
        if (searchQuery) query.search = searchQuery;

        const data = await fetchGames(query);

        setOptions(data.filters_applied);
        setGames(data.data || []);
        setFiltersApplied({
          providers: filteredProviders,
          categories: filteredCollections,
          search: searchQuery,
        });
        setPagination({
          current_page: data.pagination.current_page,
          has_next_page: data.pagination.has_next_page,
          has_prev_page: data.pagination.has_prev_page,
          next_page: data.pagination.next_page,
          prev_page: data.pagination.prev_page,
          total_pages: data.pagination.total_pages,
        });

        // Build new URL
        const urlCollections =
          collections.includes("all-collections") || collections.length === 0
            ? ["empty"]
            : collections;
        const urlProviders =
          providers.includes("all-providers") || providers.length === 0
            ? ["empty"]
            : providers;

        const newUrl = `/games/collections/${urlCollections.join(
          "/"
        )}/providers/${urlProviders.join("/")}?page=${currentPage}`;

        if (lastUrl.current !== newUrl) {
          lastUrl.current = newUrl;
          router.replace(newUrl, { scroll: false });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [collections, providers, currentPage, searchQuery, router, setOptions]);

  return (
    <div className="mb-40">
      <div className="block md:flex items-center text-gray-500">
        <h2>Applied Filters {"> "}</h2>
        {filtersApplied.providers.length !== 0 && (
          <p>Providers: {filtersApplied.providers.join(", ")}</p>
        )}
        <div>{" && "}</div>
        {filtersApplied.categories.length !== 0 && (
          <p>Categories: {filtersApplied.categories.join(", ")}</p>
        )}
        {filtersApplied.search && (
          <>
            <div>{" && "}</div>
            <p>Search: {filtersApplied.search}</p>
          </>
        )}
      </div>

      <div className="flex items-center justify-end gap-4 my-4">
        <button
          disabled={!pagination.has_prev_page}
          onClick={() =>
            pagination.prev_page && setCurrentPage(pagination.prev_page)
          }
          className="bg-[#162231] px-4 py-2 rounded disabled:opacity-50"
        >
          <ChevronLeft className="text-white" />
        </button>
        <span>
          Page {pagination.current_page} / {pagination.total_pages}
        </span>
        <button
          disabled={!pagination.has_next_page}
          onClick={() =>
            pagination.next_page && setCurrentPage(pagination.next_page)
          }
          className="bg-[#162231] px-4 py-2 rounded disabled:opacity-50"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4  gap-2 items-center">
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
      {loading && games.length === 0 ? (
        <div className="flex w-full justify-center items-center">
          <Loader2 size={60} className="animate-spin text-blue-500" />
        </div>
      ) : (
        games.length === 0 && (
          <div className="flex w-full justify-center">
            <Image
              width={500}
              height={500}
              alt="image"
              className="rounded-full"
              src={"/games_not_found.png"}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Page;
