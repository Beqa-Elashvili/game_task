"use client";

import React from "react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { categories } from "../constants/categories";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { open, toggleSidebar } = useSidebar();

  const groupedCategories = [
    { id: "group-1", range: [1, 4] },
    { id: "group-2", range: [5, 12] },
    { id: "group-3", range: [13, 15] },
    { id: "group-4", range: [16, 18] },
    // { id: "group-5", range: [19, categories.length] },
  ];

  return (
    <Sidebar
      className={cn(
        "bg-[#162231] border-r  text-white transition-all duration-300 shadow-md z-40 flex flex-col",
        open ? "w-64" : "w-20"
      )}
    >
      <SidebarHeader
        className={cn(
          "flex items-center bg-[#162231] justify-center border-b border-[#273344] px-3 py-4"
        )}
      >
        <button
          onClick={toggleSidebar}
          className="hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <Image
            src={categories[0].icon}
            alt="logo"
            className="w-[26px] h-[26px]"
            width={100}
            height={100}
          />
        </button>
      </SidebarHeader>
      <SidebarContent
        className={cn(
          "flex flex-col pb-4 bg-[#162231] gap-2 px-2 overflow-y-auto",
          !open && "px-1"
        )}
      >
        {groupedCategories.map((group) => (
          <SidebarGroup
            key={group.id}
            className={cn(
              "rounded-lg px-1 py-2 bg-[#273344] mt-2 transition-all",
              !open && "bg-transparent p-0 mt-1"
            )}
          >
            {categories.slice(group.range[0], group.range[1]).map((item) => (
              <div
                key={item.id}
                onClick={() => alert(`Clicked ${item.name}`)}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#1e2a3a] cursor-pointer transition-colors",
                  !open && "justify-center px-0"
                )}
              >
                <Image
                  src={item.icon}
                  alt="img"
                  className="w-[22px]"
                  width={200}
                  height={200}
                />
                {open && (
                  <p className="text-sm text-white truncate">{item.name}</p>
                )}
              </div>
            ))}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t bg-[#162231] border-[#273344] p-2 text-center text-xs text-gray-400">
        {open && <p>© 2025 Your App</p>}
      </SidebarFooter>
    </Sidebar>
  );
}
