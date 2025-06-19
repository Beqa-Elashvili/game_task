"use client";

import GameCard from "@/app/components/GameCard";
import { useGlobalProvider } from "@/app/provider/globalProvider";
import { fetchGames } from "@/app/utils/api";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo, use } from "react";

function Page({ params }: { params: Promise<{ params?: string[] }> }) {
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
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const filteredCollections = collections.filter(
          (col) => col !== "all-collections"
        );
        const filteredProviders = providers.filter(
          (prov) => prov !== "all-providers"
        );

        const query: any = {
          limit: 10,
          page: currentPage,
        };

        if (filteredCollections.length > 0) {
          query.category = filteredCollections;
        }

        if (filteredProviders.length > 0) {
          query.provider = filteredProviders;
        }

        if (searchQuery) {
          query.search = searchQuery;
        }

        const data = await fetchGames(query);
        console.log(data);
        setOptions(data.filters_applied);

        setGames(data.data || []);
        setFiltersApplied(
          data.filters_applied || {
            providers: filteredProviders,
            categories: filteredCollections,
            search: searchQuery,
          }
        );

        setPagination({
          current_page: data.pagination.current_page,
          has_next_page: data.pagination.has_next_page,
          has_prev_page: data.pagination.has_prev_page,
          next_page: data.pagination.next_page,
          prev_page: data.pagination.prev_page,
          total_pages: data.pagination.total_pages,
        });
      } catch (error) {
        console.error("Failed to fetch games", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [collections, providers, currentPage, searchQuery]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const currentQueryPage = url.searchParams.get("page") || "1";

    if (currentQueryPage !== currentPage.toString()) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", currentPage.toString());

      router.replace(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [currentPage, router, searchParams]);

  return (
    <div className="mb-40">
      <div className="flex items-center text-gray-500">
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

      <div className="mt-4 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2 items-center">
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
