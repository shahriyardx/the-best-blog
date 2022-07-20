import SidebarLink from "components/single/SidebarLink/SidebarLink";
import Sidebar from "components/sections/Sidebar/Sidebar";
import React from "react";
import DashHeader from "components/sections/Header/DashHeader";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const AdminPage = ({ children }: Props) => {
  return (
    <>
      <DashHeader />
      <div
        className="
        container mx-auto grid grid-cols-1 
        sm:grid-cols-sidebarLayout gap-5 px-5 
        sm:px-7 md:px-10 mt-3 sm:mt-5 md:mt-10"
      >
        <Sidebar>
          <div className="flex flex-col gap-2">
            <SidebarLink href="/admin">Dashboard</SidebarLink>
            <SidebarLink href="/admin/users">Users</SidebarLink>
            <SidebarLink href="/admin/posts">Posts</SidebarLink>
            <SidebarLink href="/admin/categories">Categories</SidebarLink>
          </div>
        </Sidebar>
        <div className="pb-10 min-h-[90vh]">{children}</div>
      </div>
    </>
  );
};

export default AdminPage;
