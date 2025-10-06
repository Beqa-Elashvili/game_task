import React from "react";
import { DollarSign, BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import { BanknoteArrowUp } from "lucide-react";
import { AuthModal } from "../authModal/modal";
import { registerUser } from "../utils/auth";
import { loginUser } from "../utils/auth";

function Header() {
  const router = useRouter();
  return (
    <div className="bg-[#152535] w-full h-[60px] flex items-center">
      <div className="w-[1200px] m-auto p-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="bg-[#253241] h-[32px] md:h-[40px] w-[60px] md:w-[75px] rounded"
          ></button>
          <div className="flex gap-2 justify-end text-white">
            <div className="flex items-center bg-[#162231] border-l border-t border-b border-gray-700 relative rounded-sm text-white">
              <div className="flex items-center justify-center gap-3 w-full px-2">
                <div className=" bg-slate-700 h-6 w-6 flex items-center justify-center rounded-full">
                  <DollarSign className="h-[18px]" />
                </div>
                <div className="flex items-center">
                  <p className="text-sm md:text-md">10,566.12 $</p>
                </div>
              </div>
              <div>
                <button className="bg-blue-500 px-4 h-[40px] w-[100px]  hidden md:block rounded-r-sm">
                  DEPOSIT
                </button>
                <button className="bg-blue-500 px-4 h-[40px] w-full block md:hidden   rounded-r-sm">
                  <BanknoteArrowUp />
                </button>
              </div>
            </div>
            <button className="border  border-gray-700 w-[40px] rounded-sm flex items-center justify-center">
              <BellRing className="w-[18px] h-[20px]" />
            </button>
            <div>
              <AuthModal onLogin={loginUser} onRegister={registerUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
