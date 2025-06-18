import React from "react";
import { useGlobalProvider } from "../provider/globalProvider";

function Header() {
  const { isCollapsed, setIsCollapsed } = useGlobalProvider();
  return (
    <div className="bg-[#152535]">
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="ml-90">
        click
      </button>
    </div>
  );
}

export default Header;
