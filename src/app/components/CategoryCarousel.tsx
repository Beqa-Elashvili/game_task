"use client";
import { useState, useRef, useEffect } from "react";
import { fetchGames } from "../utils/api";
import GameList from "./GameList";
import { Game, PaginationMeta } from "@/app/types/game";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CategoryCarouselProps {
  category: string;
  initialData: Game[];
  initialPagination: PaginationMeta;
  icon: string;
}

export default function CategoryCarousel({
  category,
  icon,
  initialData,
  initialPagination,
}: CategoryCarouselProps) {
  const [games, setGames] = useState<Game[]>(initialData);
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
    const result = await fetchGames({
      category,
      page: String(page),
      per_page: "10",
    });
    setGames(result.data);
    setPagination(result.pagination);
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
    <section>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-white">
          <Image
            width={500}
            height={500}
            className="w-[20px] h-[20px]"
            alt="image"
            src={icon}
          />
          <h2 className="text-md font-semibold capitalize">
            {category.replace("-", " ")}
          </h2>
        </div>
        <div className="flex justify-between gap-2 mt-4 mb-2">
          <button
            disabled={loading || (!pagination.has_prev_page && isAtStart)}
            onClick={() => {
              if (pagination.has_prev_page) {
                loadPage(pagination.prev_page!);
              } else {
                handleScroll("left");
              }
            }}
            className="bg-[#162231]  h-[35px] w-[35px] flex justify-center items-center rounded disabled:opacity-50"
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
            className="bg-[#162231]  h-[35px] w-[35px] flex justify-center items-center rounded disabled:opacity-50"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
      <GameList games={games} scrollRef={scrollRef} />
    </section>
  );
}
