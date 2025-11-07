import React from "react";
import { MobileFooterComp, MobileFooterItem } from "../constants/data";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
function MobileFooter() {
  const router = useRouter();

  const { toggleSidebar } = useSidebar();

  const handleClick = (title?: string) => {
    if (title === "Home") {
      router.push("/");
    } else if (title === "Search") {
      window.scrollTo({
        top: 200,
        behavior: "smooth",
      });
    } else if (title === "Menu") {
      toggleSidebar();
    }
  };

  return (
    <div className="bg-[#10212E] fixed bottom-0  p-2 w-full flex items-center justify-between h-[60px] px-6">
      {MobileFooterComp.map((item: MobileFooterItem) => {
        return (
          <div
            onClick={() => handleClick(item.title)}
            className={`text-white flex flex-col items-center ${
              !item.title &&
              "bg-blue-500 h-12 w-12 rounded-full flex items-center justify-center"
            }`}
            key={item.id}
          >
            <item.Icon className="h-[20px] w-[20px]" />
            <h1>{item.title}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default MobileFooter;
