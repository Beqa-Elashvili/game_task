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

type SelectType = "Collections" | "Providers";

const CollectionsValue = [
  { option: "All Collections" },
  { option: "Featured" },
  { option: "Popular" },
  { option: "Bonus Buy" },
  { option: "Fruits" },
];

const ProvidersValue = [
  { option: "All Providers" },
  { option: "Bgaming" },
  { option: "GameBeat" },
  { option: "Pragmatic Play" },
  { option: "NetEnt" },
];

function SelectSection({ type }: { type: SelectType }) {
  const options = type === "Collections" ? CollectionsValue : ProvidersValue;
  const router = useRouter();
  const pathname = usePathname();
  const handleChange = (value: string) => {
    const typeSegment = type.toLowerCase();

    const segments = pathname.split("/").filter(Boolean);

    // Separate existing collections and providers values
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

    // Add new value if it doesn't exist yet
    if (typeSegment === "collections" && !collections.includes(value)) {
      collections.push(value);
    }
    if (typeSegment === "providers" && !providers.includes(value)) {
      providers.push(value);
    }

    // Build new URL
    const newPath = [
      "games",
      "collections",
      ...collections,
      "providers",
      ...providers,
    ]
      // Filter out empty values if any
      .filter(Boolean)
      .join("/");

    router.push(`/${newPath}`);
  };
  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] border border-gray-700 text-white font-bold">
          <SelectValue placeholder={type} />
        </SelectTrigger>

        <SelectContent className="bg-[#162231] border border-gray-700 text-white p-0">
          {options.map((item) => (
            <SelectItem
              key={item.option}
              value={item.option.toLowerCase().replace(/\s+/g, "-")}
              className="cursor-pointer hover:bg-[#1f2d41]"
            >
              <Image
                src={"/sidebar_dice.png"}
                width={500}
                alt="image"
                height={500}
                className="w-[20px] h-[20px]"
              />
              {item.option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectSection;
