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
import usePathnameHook from "../hooks/usePathname";

export function AppSidebar() {
  const { open, toggleSidebar, isMobile } = useSidebar();
  const { handleClick } = usePathnameHook();

  const groupedCategories = [
    { id: "group-1", range: [1, 4] },
    { id: "group-2", range: [5, 12] },
    { id: "group-3", range: [13, 15] },
    { id: "group-4", range: [16, 18] },
  ];
  const isSidebarOpen = isMobile ? "true" : open;

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"}
      className={cn(
        "bg-[#162231] border-r h-full border-slate-800  text-white transition-all duration-300 shadow-md z-40 flex flex-col"
      )}
    >
      <SidebarHeader
        className={cn(
          "flex items-center w-full bg-[#162231] justify-center border-b border-[#273344] px-3 py-6"
        )}
      >
        <div className="relative flex items-center justify-between w-full">
          <h1
            className={cn(
              "absolute left-0 -translate-x-1/2  font-semibold text-slate-200 shadow transition-all duration-300 ease-in-out whitespace-nowrap",
              isSidebarOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            GAME ZZ TASK
          </h1>

          <button
            onClick={toggleSidebar}
            className="absolute right-0 hover:opacity-80 transition-opacity"
          >
            <Image
              src={categories[0].icon}
              alt="logo"
              className="w-[20px] h-[20px]"
              width={100}
              height={100}
            />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent
        className={cn(
          "flex flex-col pb-2 bg-[#162231] gap-2 pt-2 px-2 overflow-y-auto",
          !isSidebarOpen && "px-1"
        )}
      >
        {groupedCategories.map((group, index) => (
          <SidebarGroup
            key={group.id}
            className={cn("rounded-lg px-1 py-2 bg-[#273344] transition-all")}
          >
            {categories.slice(group.range[0], group.range[1]).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (index === 1) {
                    handleClick(item.name!);
                  } else {
                    alert(`Clicked ${item.name}`);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 px-2 py-2 rounded-md hover:bg-[#1e2a3a] cursor-pointer transition-colors",
                  !isSidebarOpen && "justify-center px-0"
                )}
              >
                <Image
                  src={item.icon}
                  alt="img"
                  className="w-[22px]"
                  width={200}
                  height={200}
                />
                {isSidebarOpen && (
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
