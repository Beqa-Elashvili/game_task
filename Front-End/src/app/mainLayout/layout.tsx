"use client";

import { ReactNode, useEffect } from "react";
import Sidebar from "../components/sideBar";
import Header from "./Header";
import Provider, { useGlobalProvider } from "../provider/globalProvider";
import MobileFooter from "./MobileFooter";
import Footer from "./Footer";
import { getCurrentUser } from "../utils/auth";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { isCollapsed, setUserData } = useGlobalProvider();

  useEffect(() => {
    const getUserData = async () => {
      const resp = await getCurrentUser();
      setUserData(resp);
    };
    getUserData();
  }, []);

  return (
    <div className="min-h-screen  w-full m-auto bg-gray-100">
      <div className="flex min-h-screen h-full">
        <Sidebar />
        <div className="w-full bg-[#1C2E3D]">
          <Header />
          <div>
            <main
              className={`flex justify-center flex-col w-full p-2   max-w-[1200px] m-auto min-h-screen  py-7 ${
                isCollapsed ? "md:pl-25" : "md:"
              }`}
            >
              {children}
            </main>
            <Footer />
          </div>
          <div className="block md:hidden ">
            <MobileFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
