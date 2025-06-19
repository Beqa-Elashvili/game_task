"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectSection from "./SelectSection";
import ChoiceCategory from "./choiceCategory";

function FilterBar() {
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
      const params = new URLSearchParams(window.location.search);

      if (searchTerm.trim().length >= 3) {
        params.set("search", searchTerm.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm, pathname, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="w-full flex items-center gap-2 my-4">
        <div className="relative w-full flex items-center text-white">
          <Input
            placeholder="Search your game"
            className="bg-[#162231] h-[40px] border border-gray-700 w-[798px] pl-10 rounded"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute text-gray-500 left-2" />
        </div>
        <div className="flex items-center h-full gap-2 w-full">
          <SelectSection type="Collections" />
          <SelectSection type="Providers" />
        </div>
      </div>
      <ChoiceCategory />
    </div>
  );
}

export default FilterBar;
