import React from "react";
import { Children } from "types/common";

type Props = {
  children: Children;
  mdCommand: (command: string) => void;
  command: string;
};

const ToolbarButton = ({ children, mdCommand, command }: Props) => {
  return (
    <button
      type="button"
      onClick={() => mdCommand(command)}
      className="hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-700 focus:bg-zinc-900 focus:text-white dark:focus:bg-zinc-700"
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
