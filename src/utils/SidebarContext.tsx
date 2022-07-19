import { createContext, useState } from "react";
import { Children } from "types/common";

const SidebarContext = createContext({
  open: false,
  toggle: (state?: boolean) => {},
});

export const SidebarProvider = ({ children }: { children: Children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = (state?: boolean) => {
    setOpen(typeof state === undefined ? !open : (state as boolean));
  };

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
