import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import useTheme from "hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
          cursor-pointer p-3 rounded-full text-lg 
         bg-zinc-700 text-white outline-none 
          focus:outline-2 focus:outline-blue-500
        "
    >
      {theme === "dark" ? <BiSun /> : <BiMoon />}
    </button>
  );
};

export default ThemeToggle;
