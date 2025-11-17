import Image from "next/image";
import React from "react";
import { currencyIcons, footerData, TFooterData } from "../constants/data";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Footer() {
  return (
    <div className="bg-slate-800 md:bg-transparent py-4 px-6 md:px-2">
      <div className="md:flex gap-2   w-full">
        <div className="md:max-w-1/4 flex flex-col  gap-2 justify-between">
          <div className=" w-18 h-10 md:w-26 md:h-14 bg-slate-700 rounded-md" />
          <div className="text-slate-400 font-semibold text-balance ">
            Strike it rich at CASIONO! Experience heart-punding actions with
            massive jacjpots fast pauouts, and VIP treatment that keeps
            champions coming back. Join thousands of winners today - your
            fortune awaits!
          </div>
        </div>
        <div className="block md:hidden h-px border my-4 border-slate-500" />
        <div className=" grid grid-cols-2 gap-10  md:grid-cols-4 w-full">
          {footerData.map((item: TFooterData, index: number) => (
            <div key={index}>
              <h1 className="text-white font-bold text-lg md:text-xl">
                {item.title}
              </h1>
              <div className="space-y-3 flex flex-col items-start mt-3 text-slate-400 font-semibold">
                {item.items.map(
                  (item: { label: string; href: string }, index: number) => (
                    <a
                      key={index}
                      href={item.href}
                      className="cursor-pointer hover:text-slate-900 duration-100 transition-all "
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-px border my-7 border-slate-500" />
      <div className="block md:hidden">
        <div className="flex justify-center gap-8 items-center">
          {currencyIcons.slice(0, 5).map((Item: LucideIcon, index: number) => (
            <Item key={index} className={cn("text-slate-400 size-8")} />
          ))}
        </div>
        <div className="flex mt-2 justify-between items-center">
          {currencyIcons
            .slice(5, currencyIcons.length)
            .map((Item: LucideIcon, index: number) => (
              <Item key={index} className={cn("text-slate-400 size-8")} />
            ))}
        </div>
      </div>
      <div className="hidden md:flex justify-center gap-14 items-center">
        {currencyIcons.map((Item: LucideIcon, index: number) => (
          <div
            key={index}
            className="bg-slate-900 h-12 w-12 flex items-center justify-center rounded-full"
          >
            <Item className={cn("text-slate-400 size-8")} />
          </div>
        ))}
      </div>
      <div className="h-px border my-7 border-slate-500" />

      <Image
        className="block md:hidden w-full"
        src={"/footer.png"}
        alt="image"
        width={500}
        height={500}
      />
      <Image
        className="hidden md:block w-full"
        src={"/casino_footer_content.png"}
        alt="image"
        width={500}
        height={500}
      />
    </div>
  );
}

export default Footer;
