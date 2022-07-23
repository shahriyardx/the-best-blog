import { Notification, User } from "@prisma/client";
import CommentNotification from "./CommentNotification";
import FollowNotification from "./FollowNotifiacation";
import LikeNotification from "./LikeNotification";

type Props = {
  notification: Notification & { from: Pick<User, "username"> };
  border?: boolean;
};

const Notification = ({ notification }: Props) => {
  return notification.type === "LIKE" ? (
    <LikeNotification notification={notification} />
  ) : notification.type === "COMMENT" ? (
    <CommentNotification notification={notification} />
  ) : notification.type === "FOLLOW" ? (
    <FollowNotification notification={notification} />
  ) : null;
};

export default Notification;
