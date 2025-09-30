"use client";

import { useContext, useState } from "react";
import { TGameFilterQuery, UserDetailContext } from "./globalContext";

function Provider({ children }: { children: any }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [options, setOptions] = useState<TGameFilterQuery>();

  return (
    <UserDetailContext.Provider
      value={{ isCollapsed, setIsCollapsed, options, setOptions }}
    >
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useGlobalProvider = () => {
  const context = useContext(UserDetailContext);
  return context;
};
