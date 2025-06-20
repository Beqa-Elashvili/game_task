"use client";

import { useGlobalProvider } from "../provider/globalProvider";
import React from "react";
import { categories } from "../constants/categories";
import Image from "next/image";

function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useGlobalProvider();

  const sidebarClassnames = `fixed flex flex-col ${
    isCollapsed ? "w-0 md:w-16" : "w-full md:w-60"
  } bg-[#162231]  text-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  const groupedCategories = [
    { id: "group-1", range: [1, 4], bg: "bg-[#273344]" },
    { id: "group-2", range: [5, 12], bg: "bg-[#273344] mt-2" },
    { id: "group-4", range: [13, 15], bg: "mt-2 bg-[#273344]" },
    { id: "group-5", range: [16, 18], bg: "mt-2 bg-[#273344]" },
    { id: "group-6", range: [19, categories.length], bg: "mt-2 bg-[#273344]" },
  ];

  return (
    <div className={sidebarClassnames}>
      <div className={`flex  ${isCollapsed && "items-center"} flex-col px-2`}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:cursor-pointer"
        >
          <Image
            src={categories[0].icon}
            alt="img"
            className="w-[22px] mt-6 mb-4"
            width={200}
            height={200}
          />
        </button>
        {groupedCategories.map((group) => (
          <div
            key={group.id}
            className={`rounded-lg  flex flex-col gap-2  ${
              !isCollapsed && group.bg
            }`}
          >
            {categories.slice(group.range[0], group.range[1]).map((item) => (
              <div
                key={item.id}
                className="p-2 flex gap-2 hover:cursor-pointer"
              >
                <Image
                  src={item.icon}
                  alt="img"
                  className="w-[22px]"
                  width={200}
                  height={200}
                />
                <div className={`${isCollapsed && "hidden"}`}>
                  <p className="text-sm">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
