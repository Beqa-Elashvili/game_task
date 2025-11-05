"use client";

import React from "react";
import Image from "next/image";
import { useGlobalProvider } from "../provider/globalProvider";
import { TCollections } from "../provider/globalContext";
import usePathnameHook from "../hooks/usePathname";

function ChoiceCategory({
  collectionsData,
}: {
  collectionsData: TCollections[];
}) {
  const { handleClick } = usePathnameHook();

  const { options } = useGlobalProvider();

  return (
    <div className="w-full">
      <section className="w-full">
        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory no-scrollbar py-2 px-1"
        >
          {collectionsData?.map((item: TCollections) => {
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
                key={item.id}
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
