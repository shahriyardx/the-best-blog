import { createContext, useState } from "react";
import { Children } from "types/common";

const SidebarContext = createContext({
  open: false,
  toggle: () => {},
});

export const SidebarProvider = ({ children }: { children: Children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
