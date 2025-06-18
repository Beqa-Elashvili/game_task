"use client";

import { useContext, useState } from "react";
import { UserDetailContext } from "./globalContext";

function Provider({ children }: { children: any }) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <UserDetailContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useGlobalProvider = () => {
  const context = useContext(UserDetailContext);
  return context;
};
