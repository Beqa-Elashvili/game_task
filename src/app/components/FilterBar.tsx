import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SelectSection from "./SelectSection";

function FilterBar() {
  return (
    <div className="w-full flex items-center">
      <div className="relative w-[797px]  flex items-center text-white">
        <Input
          placeholder="Search your game"
          className="bg-[#162231] h-[40px] border border-gray-700 w-full p-2  pl-10 rounded my-4"
          type="text"
        />
        <Search className="absolute text-gray-500 left-2" />
      </div>
      <div className="flex items-center gap-2">
        <SelectSection type="Collections" />
        <SelectSection type="Providers" />
      </div>
    </div>
  );
}

export default FilterBar;
