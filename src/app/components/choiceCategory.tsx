"use client";

import React from "react";
import { CategoriesChoice } from "../constants/categories";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useGlobalProvider } from "../provider/globalProvider";

function ChoiceCategory() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (category: string) => {
    const segments = pathname.split("/").filter(Boolean);

    const collections: string[] = [];
    const providers: string[] = [];

    let currentType: string | null = null;

    for (const segment of segments) {
      if (segment === "collections" || segment === "providers") {
        currentType = segment;
      } else if (currentType === "collections") {
        collections.push(segment);
      } else if (currentType === "providers") {
        providers.push(segment);
      }
    }

    const newCategory = category.toLowerCase().replace(/\s+/g, "-");

    const updatedCollections = collections.filter(
      (c) => c !== "all-collections" && c !== newCategory
    );
    updatedCollections.push(newCategory);

    const newPath = [
      "games",
      "collections",
      ...updatedCollections,
      "providers",
      ...(providers.length ? providers : ["all-providers"]),
    ].join("/");

    router.push(`/${newPath}`);
  };

  const { options } = useGlobalProvider();
  console.log(options);
  return (
    <div className="w-full">
      <section className="w-full">
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory no-scrollbar py-2 px-1"
        >
          {CategoriesChoice.map((item) => {
            return (
              <div
                onClick={() => handleClick(item.name)}
                className={`${
                  options?.categories
                    .map((c) => c.toLowerCase())
                    .includes(item.name.toLowerCase())
                    ? "bg-[#10202D]"
                    : "bg-[#223444]"
                }  hover:cursor-pointer min-w-fit shrink-0 p-2 px-4 hover:bg-[#10202D] rounded flex gap-2 items-center text-white`}
                key={item.name}
              >
                <Image
                  className="h-[20px] w-[20px]"
                  width={20}
                  height={20}
                  alt="icon"
                  src={item.icon}
                />
                <p>{item.name.replace(/-/g, " ")}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ChoiceCategory;
