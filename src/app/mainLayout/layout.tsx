"use client";

import { ReactNode } from "react";
import Sidebar from "../components/sideBar";
import Header from "./Header";
import Provider, { useGlobalProvider } from "../provider/globalProvider";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isCollapsed } = useGlobalProvider();
  return (
    <Provider>
      <div className="min-h-screen  w-full m-auto bg-gray-100">
        <div className="flex min-h-screen h-full">
          <Sidebar />
          <div className="w-full bg-[#1C2E3D]">
            <Header />
            <main
              className={`flex justify-center flex-col   w-[1200px] m-auto min-h-screen  py-7 ${
                isCollapsed ? "md:pl-25" : "md:"
              }`}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default MainLayout;
