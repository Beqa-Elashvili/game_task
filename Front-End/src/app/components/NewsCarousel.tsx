"use client";
import { useState, useRef, useEffect } from "react";
import { fetchNews } from "../utils/api"; // Make sure to create this function
import { PaginationMeta } from "@/app/types/game"; // Or create a NewsPagination type if needed
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  img: string;
}

interface NewsCarouselProps {
  initialData: NewsItem[];
  initialPagination: PaginationMeta;
  title?: string;
  icon?: string;
}

export default function NewsCarousel({
  initialData,
  initialPagination,
  title = "News",
  icon,
}: NewsCarouselProps) {
  const [news, setNews] = useState<NewsItem[]>(initialData);
  const [pagination, setPagination] =
    useState<PaginationMeta>(initialPagination);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadPage = async (page: number) => {
    setLoading(true);
    const result = await fetchNews();
    setNews(result.data);
    setPagination(result.meta);
    setLoading(false);
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative border-1 space-y-3 border-blue-700 p-4 py-4  rounded-xl   bg-gradient-to-r from-blue-900  via-[#112348] to-black ">
      <div className="flex justify-between  items-center ">
        <div className="flex items-center gap-2 text-white">
          {icon && (
            <Image
              width={500}
              height={500}
              className="w-[20px] h-[20px]"
              alt="icon"
              src={icon}
            />
          )}
          <h2 className="text-md font-semibold capitalize">{title}</h2>
        </div>
        <div className="flex justify-between gap-2">
          <button
            disabled={loading || (!pagination.has_prev_page && isAtStart)}
            onClick={() => {
              if (pagination.has_prev_page) {
                loadPage(pagination.prev_page!);
              } else {
                handleScroll("left");
              }
            }}
            className="bg-[#162231] h-[35px] w-[35px] flex justify-center items-center rounded disabled:opacity-50"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            disabled={loading || (!pagination.has_next_page && isAtEnd)}
            onClick={() => {
              if (pagination.has_next_page) {
                loadPage(pagination.next_page!);
              } else {
                handleScroll("right");
              }
            }}
            className="bg-[#162231] h-[35px] w-[35px] flex justify-center items-center rounded disabled:opacity-50"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex  rounded-lg overflow-x-auto gap-6 scrollbar-hide"
      >
        {news.map((item) => (
          <div
            key={item.id}
            className="border-2 border-red-500 rounded-xl bg-black"
          >
            <div className="flex-shrink-0 m-0.5 cursor-pointer w-[140px] h-[200px] relative rounded-lg overflow-hidden">
              <Image
                src={item.img}
                alt="news image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute top-0 rounded-l-xl left-0  w-40 h-full bg-gradient-to-r from-blue-600 via-transparent to-transparent transition duration-700",
          !pagination.has_prev_page && isAtStart ? "opacity-0" : "opacity-100"
        )}
      ></div>
      <div
        className={cn(
          "pointer-events-none absolute top-0 rounded-r-xl right-0  w-40 h-full bg-gradient-to-l from-blue-600 via-transparent to-transparent transition duration-700",
          !pagination.has_next_page && isAtEnd ? "opacity-0" : "opacity-100"
        )}
      ></div>
    </section>
  );
}
