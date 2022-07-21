import React from "react";
import { Menu } from "@headlessui/react";
import { BiBell } from "react-icons/bi";
import LikeNotification from "../Notifications/LikeNotification";
import CommentNotification from "../Notifications/CommentNotification";
import FollowNotification from "../Notifications/FollowNotifiacation";
import Link from "next/link";

const NotificatioButton = () => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        as="button"
        className="p-3 bg-zinc-700 rounded-full text-zinc-300 text-lg relative"
      >
        <BiBell />
        <div className="w-3 h-3 absolute top-[1px] -right-[1px] bg-red-500 rounded-full"></div>
      </Menu.Button>
      <Menu.Items className="absolute top-12 right-0 w-60 sm:w-80 flex flex-col gap-3 z-10 bg-zinc-800 p-3 rounded-md">
        <Menu.Item>
          {({ active }: { active: boolean }) => (
            <LikeNotification active={active} />
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }: { active: boolean }) => (
            <CommentNotification active={active} />
          )}
        </Menu.Item>

        <Menu.Item>
          {({ active }: { active: boolean }) => (
            <FollowNotification active={active} />
          )}
        </Menu.Item>
        <Link href="/u/notifications">
          <a className="text-center text-white rounded-md text-xs hover:text-blue-400">
            See All
          </a>
        </Link>
      </Menu.Items>
    </Menu>
  );
};

export default NotificatioButton;
