"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalProvider } from "../provider/globalProvider";

type SelectType = "Collections" | "Providers";

function SelectSection({ type }: { type: SelectType }) {
  const { collectionsData, providersData } = useGlobalProvider();
  const options = type === "Collections" ? collectionsData : providersData;
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (value: string) => {
    const typeSegment = type.toLowerCase();

    const segments = pathname.split("/").filter(Boolean);

    const collections: string[] = [];
    const providers: string[] = [];

    let currentType: string | null = null;
    for (const segment of segments) {
      if (segment === "collections" || segment === "providers") {
        currentType = segment;
      } else if (currentType === "collections") {
        collections.push(segment);
      } else if (currentType === "providers") {
        providers.push(segment);
      }
    }

    if (typeSegment === "collections" && !collections.includes(value)) {
      collections.push(value);
    }
    if (typeSegment === "providers" && !providers.includes(value)) {
      providers.push(value);
    }

    const newPath = [
      "games",
      "collections",
      ...collections,
      "providers",
      ...providers,
    ]
      .filter(Boolean)
      .join("/");

    router.push(`/${newPath}`);
  };
  return (
    <div className="w-full">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full h-[40px] border rounded border-gray-700 text-white py-[18.7px] font-bold">
          <SelectValue placeholder={type} />
        </SelectTrigger>

        <SelectContent className="bg-[#162231] border border-gray-700 text-white p-0">
          {options.map((item) => (
            <SelectItem
              key={item.name}
              value={item.name.toLowerCase().replace(/\s+/g, "-")}
              className="cursor-pointer hover:bg-[#1f2d41]"
            >
              <Image
                src={"/sidebar_dice.png"}
                width={500}
                alt="image"
                height={500}
                className="w-[20px] h-[20px]"
              />
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectSection;
