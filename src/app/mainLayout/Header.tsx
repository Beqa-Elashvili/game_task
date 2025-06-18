import React from "react";
import { DollarSign, UserRound, BellRing } from "lucide-react";

function Header() {
  return (
    <div className="bg-[#152535] w-full h-[60px] flex items-center">
      <div className="w-[1200px] m-auto">
        <div className="flex gap-2 justify-end text-white">
          <div className="flex items-center bg-[#162231] border-l border-t border-b border-gray-700 relative rounded-sm text-white">
            <div className="flex items-center justify-center gap-3 w-full px-2">
              <div className=" bg-slate-700 h-6 w-6 flex items-center justify-center rounded-full">
                <DollarSign className="h-[18px]" />
              </div>
              <div className="flex items-center">
                <p>10,566.12 $</p>
              </div>
            </div>
            <div>
              <button className="bg-blue-500 px-4 h-[40px] w-[100px]  rounded-r-sm">
                DEPOSIT
              </button>
            </div>
          </div>
          <button className="border  border-gray-700 w-[40px] rounded-sm flex items-center justify-center">
            <BellRing className="w-[18px] h-[20px]" />
          </button>
          <button className="border border-gray-700 w-[40px] rounded-sm flex items-center justify-center">
            <UserRound className="w-[18px] border-2 rounded-full h-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
