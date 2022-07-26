import React from "react";
import { Menu } from "@headlessui/react";
import { BiBell } from "react-icons/bi";
import Link from "next/link";
import useNotifications from "hooks/useNotifications";
import Notification from "../Notifications/Notifications";

const NotificatioButton = () => {
  const { notifications: allNots } = useNotifications();
  const notifications = allNots
    ? allNots.filter((notification) => notification.status === "UNREAD")
    : [];
    
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as="button"
        className="p-3 bg-zinc-700 rounded-full text-zinc-300 text-lg relative"
      >
        <BiBell />

        {notifications.length ? (
          <div className="w-3 h-3 absolute top-[1px] -right-[1px] bg-red-500 rounded-full"></div>
        ) : null}
      </Menu.Button>
      <Menu.Items className="absolute top-12 right-0 w-60 sm:w-80 flex flex-col gap-3 z-10 bg-zinc-800 p-3 rounded-md border-[1px] border-zinc-600">
        {!notifications.length && (
          <p className="p-3 text-center text-red-300">No new notifications</p>
        )}
        {notifications.slice(0, 2).map((notification) => {
          return (
            <Menu.Item key={notification.id}>
              <Notification notification={notification} />
            </Menu.Item>
          );
        })}
        {notifications.length > 0 && (
          <Link href="/u/notifications">
            <a className="text-center text-white rounded-md text-xs hover:text-blue-400">
              See All
            </a>
          </Link>
        )}
      </Menu.Items>
    </Menu>
  );
};

export default NotificatioButton;
