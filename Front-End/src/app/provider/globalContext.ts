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
}

export const UserDetailContext = createContext<GlobalContextTypes>({
  isCollapsed: false,
  setIsCollapsed: () => {},
  options: undefined,
  setOptions: () => {},
});
