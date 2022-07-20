import React, { useContext } from "react";
import Router from "next/router";
import { BiX } from "react-icons/bi";
import { Children } from "types/common";
import SidebarContext from "@utils/SidebarContext";

type Props = {
  children: Children;
};

const Sidebar = ({ children }: Props) => {
  const { open, toggle } = useContext(SidebarContext);
  Router.events.on("routeChangeComplete", () => (open ? toggle() : {}));

  return (
    <div
      className={`
      fixed transition-[left] top-0 h-screen sm:h-auto p-5 pt-10
      bg-black w-full max-w-[300px] 
      sm:static sm:p-0 sm:bg-transparent
      text-zinc-300 sm:text-black sm:dark:text-zinc-300 z-10
      ${open ? "left-0" : "-left-full"}
      `}
    >
      <div className="flex flex-col gap-10 sm:sticky sm:top-5">{children}</div>

      <BiX
        onClick={() => toggle()}
        className="
          absolute top-5 right-5 sm:hidden 
          text-2xl cursor-pointer
        "
      />
    </div>
  );
};

export default Sidebar;
