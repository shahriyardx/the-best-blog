import React from "react";
import { NextPage } from "next";
import ProfilePage from "components/Layouts/ProfilePage";
import SEO from "components/single/SEO";
import { trpc } from "@utils/trpc";
import LikeNotification from "components/single/Notifications/LikeNotification";
import CommentNotification from "components/single/Notifications/CommentNotification";
import FollowNotification from "components/single/Notifications/FollowNotifiacation";
import { useSession } from "next-auth/react";

const Posts: NextPage & { requireAuth: boolean } = () => {
  const { data: session } = useSession();
  const { data: notifications, refetch } = trpc.useQuery(
    ["user.myNotificationsAll"],
    {
      refetchOnWindowFocus: false,
    }
  );
  const { mutate: markRead } = trpc.useMutation(["notification.markRead"]);

  const markAllRead = () => {
    markRead({ to_id: session?.profile.id as string });
    refetch();
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
          return notification.type === "LIKE" ? (
            <LikeNotification
              key={notification.id}
              border={notification.status === "UNREAD"}
              notification={notification}
            />
          ) : notification.type === "COMMENT" ? (
            <CommentNotification
              key={notification.id}
              border={notification.status === "UNREAD"}
              notification={notification}
            />
          ) : notification.type === "FOLLOW" ? (
            <FollowNotification
              key={notification.id}
              border={notification.status === "UNREAD"}
              notification={notification}
            />
          ) : null;
        })}
      </div>
    </ProfilePage>
  );
};

Posts.requireAuth = true;
export default Posts;
