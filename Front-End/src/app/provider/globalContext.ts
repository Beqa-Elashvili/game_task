import { createContext, Dispatch, SetStateAction } from "react";

export type TGameFilterQuery = {
  categories: string[];
  providers: string[];
  search: string;
};

export interface GlobalContextTypes {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  options: TGameFilterQuery | undefined;
  setOptions: Dispatch<SetStateAction<TGameFilterQuery | undefined>>;
  collectionsData: TCollections[];
  setCollectionsData: Dispatch<SetStateAction<TCollections[]>>;
  categoriesData: TCategory[];
  setCategoriesData: Dispatch<SetStateAction<TCategory[]>>;
  providersData: TProviders[];
  setProvidersData: Dispatch<SetStateAction<TProviders[]>>;
}
export interface TCategory {
  name: string;
  id: string;
}
export interface TCollections {
  name: string;
  icon: string;
  id: string;
}
export interface TProviders {
  name: string;
  id: string;
}

export const UserDetailContext = createContext<GlobalContextTypes>({
  isCollapsed: false,
  setIsCollapsed: () => {},
  providersData: [],
  setProvidersData: () => {},
  collectionsData: [],
  setCollectionsData: () => {},
  categoriesData: [],
  setCategoriesData: () => {},
  options: undefined,
  setOptions: () => {},
});
