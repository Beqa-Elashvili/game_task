export interface Game {
  id: string;
  name: string;
  provider: string;
  image: string;
  categories: string[];
  videoUrl: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  next_page: number | null;
  prev_page: number | null;
}

export interface FiltersApplied {
  providers: string[];
  categories: string[];
  search: string;
}
