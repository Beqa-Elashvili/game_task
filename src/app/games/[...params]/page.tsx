"use client";

import { fetchGames } from "@/app/utils/api";
import React, { useEffect, useState, useMemo, use } from "react";

function Page({ params }: { params: Promise<{ params?: string[] }> }) {
  const resolvedParams = use(params);
  const segments = resolvedParams?.params || [];

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

  const [games, setGames] = useState<any[]>([]);
  const [filtersApplied, setFiltersApplied] = useState({
    providers: [] as string[],
    categories: [] as string[],
    search: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        const filteredCollections = collections.filter(
          (col) => col !== "all-collections"
        );

        const filteredProviders = providers.filter(
          (prov) => prov !== "all-providers"
        );

        const query: any = {
          limit: 10,
        };
        if (filteredCollections.length > 0) {
          query.category = filteredCollections;
        }
        if (filteredProviders.length > 0) {
          query.provider = filteredProviders;
        }

        const data = await fetchGames(query);

        setGames(data.data || []);
        setFiltersApplied(
          data.filters_applied || {
            providers: filteredProviders,
            categories: filteredCollections,
            search: "",
          }
        );
      } catch (error) {
        console.error("Failed to fetch games", error);
      }
    };

    getData();
  }, [collections, providers]);

  return (
    <div>
      <h2>Applied Filters</h2>
      <p>Providers: {filtersApplied.providers.join(", ") || "None"}</p>
      <p>Categories: {filtersApplied.categories.join(", ") || "None"}</p>

      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
