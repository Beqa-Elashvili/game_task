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
  userData: TUser;
  setUserData: Dispatch<SetStateAction<TUser>>;
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
export interface TUser {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  personalNumber: string;
  createdAt: string;
}
export const defaultUserData: TUser = {
  id: "",
  email: "",
  name: "",
  phoneNumber: "",
  personalNumber: "",
  createdAt: "",
};

export const UserDetailContext = createContext<GlobalContextTypes>({
  userData: defaultUserData,
  setUserData: () => {},
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
