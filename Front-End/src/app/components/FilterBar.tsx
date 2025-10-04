"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectSection from "./SelectSection";
import ChoiceCategory from "./choiceCategory";
import { TCategory, TCollections, TProviders } from "../provider/globalContext";

function FilterBar({
  categories,
  providers,
}: {
  categories: TCategory[];
  providers: TProviders[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmedSearch = searchTerm.trim();
      const params = new URLSearchParams(window.location.search);

      if (trimmedSearch.length >= 3) {
        params.set("search", trimmedSearch);
        params.delete("page");

        let newPath = pathname;

        const isCorrectPath =
          pathname.includes("/games/collections") &&
          pathname.includes("/providers");

        if (!isCorrectPath) {
          newPath = "/games/collections/providers";
        }

        router.push(`${newPath}?${params.toString()}`);
      } else {
        params.delete("search");
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, pathname, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="w-full block  md:flex  items-center gap-2 my-4">
        <div className="relative w-full flex items-center text-white">
          <Input
            placeholder="Search your game"
            className="bg-[#162231] h-[40px] border border-gray-700  w-full md:w-[787px] pl-10 rounded"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute text-gray-500 left-2" />
        </div>
        <div className="overflow-hidden block md:hidden">
          <ChoiceCategory collectionsData={categories as TCollections[]} />
        </div>
        <div className="flex items-center h-full gap-2 w-full">
          <SelectSection data={categories} type="Collections" />
          <SelectSection data={providers} type="Providers" />
        </div>
      </div>
      <div className="overflow-hidden hidden md:block">
        <ChoiceCategory collectionsData={categories as TCollections[]} />
      </div>
    </div>
  );
}

export default FilterBar;
