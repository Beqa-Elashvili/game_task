"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Providers: { icon: string }[] = [
  { icon: "/logo 1.png" },
  { icon: "/media_f068b3834fe0b556b6a9d5efa9a8ea5e838d33d280 1.png" },
  { icon: "/BG.png" },
  { icon: "/media_f0f6393cc844b0a22c0c21bb799e576e31dbcc8f71 1.png" },
  { icon: "/idG8Cz4H7e_logos 1.png" },
  { icon: "/Group 2131328624.png" },
  { icon: "/qs.png" },
];

export default function ProvidersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft <= 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    updateScrollState();
    const handleScroll = () => updateScrollState();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="my-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-white">
          <Image
            width={500}
            height={500}
            className="w-[20px] h-[20px]"
            alt="image"
            src={"/providers_image.png"}
          />
          <h2 className="text-md font-semibold capitalize">Providers </h2>
        </div>
        <div className="flex gap-2">
          <button
            disabled={isAtStart}
            onClick={() => handleScroll("left")}
            className="bg-[#162231] h-[35px] w-[35px]  flex items-center justify-center rounded disabled:opacity-50"
          >
            <ChevronLeft className="text-white " />
          </button>
          <button
            disabled={isAtEnd}
            onClick={() => handleScroll("right")}
            className="bg-[#162231]  h-[35px] w-[35px] flex justify-center items-center rounded disabled:opacity-50"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex gap-4 overflow-x-auto w-full scroll-smooth no-scrollbar"
      >
        {Providers.map((provider, index) => (
          <div
            key={index}
            className="bg-[rgb(34,52,68)] rounded p-2 min-w-[120px] md:min-w-[180px] h-[50px] md:h-[60px] flex justify-center items-center"
          >
            <Image
              src={provider.icon}
              alt={`Provider ${index + 1}`}
              width={60}
              height={60}
              className="object-contain h-[40px] w-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
