import React, { useContext } from "react";
import ThemeToggle from "components/single/ThemeToggle/ThemeToggle";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import SidebarContext from "@utils/SidebarContext";
import NotificatioButton from "components/single/NotificatioButton/NotificatioButton";
import { useSession } from "next-auth/react";

const Header = () => {
  const { status } = useSession()
  const { toggle } = useContext(SidebarContext);

  return (
    <header className="container mx-auto px-5 sm:px-7 md:px-10 py-3 sm:py-5 md:py-10  flex items-center">
      <BiMenu
        onClick={toggle}
        className="text-3xl mr-3 cursor-pointer sm:hidden -mb-1 dark:text-zinc-300"
      />
      <Link href="/" passHref>
        <a className="flex flex-col">
          <span className="text-2xl font-semibold dark:text-zinc-300">
            The Best
          </span>
          <span className="text-sky-600 hidden sm:block">
            By the best for the best
          </span>
        </a>
      </Link>

      <div className="flex items-center gap-2 ml-auto">
        {status === "authenticated" && <NotificatioButton />}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
