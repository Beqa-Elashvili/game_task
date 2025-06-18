import { createContext, Dispatch, SetStateAction } from "react";

export interface GlobalContextTypes {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const UserDetailContext = createContext<GlobalContextTypes>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});
