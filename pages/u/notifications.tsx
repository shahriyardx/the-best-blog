import React from "react";
import { NextPage } from "next";
import ProfilePage from "components/Layouts/ProfilePage";
import SEO from "components/single/SEO";
import { useSession } from "next-auth/react";
import useNotifications from "hooks/useNotifications";
import Notification from "components/single/Notifications/Notifications";

const Posts: NextPage & { requireAuth: boolean } = () => {
  const { data: session } = useSession();
  const { notifications, markRead } = useNotifications();

  const markAllRead = () => {
    markRead({ to_id: session?.profile.id as string });
  };

  return (
    <ProfilePage>
      <SEO title="Notifications" />

      <div className="py-5">
        <button
          onClick={() => markAllRead()}
          className="px-3 py-2 text-white bg-zinc-700 hover:bg-zinc-600 rounded-md"
        >
          Mark all as read
        </button>
      </div>
      <div className="flex flex-col gap-5">
        {notifications?.map((notification) => {
          return (
            <Notification
              key={notification.id}
              border={notification.status === "UNREAD"}
              notification={notification}
            />
          );
        })}
      </div>
    </ProfilePage>
  );
};

Posts.requireAuth = true;
export default Posts;
