import { Notification, User } from "@prisma/client";
import CommentNotification from "./CommentNotification";
import LikeNotification from "./LikeNotification";

type Props = {
  notification: Notification & { from: Pick<User, "username"> };
  border?: boolean;
};

const Notification = ({ notification, border }: Props) => {
  const Component =
    notification.type === "LIKE"
      ? LikeNotification
      : notification.type === "COMMENT"
      ? CommentNotification
      : LikeNotification;

  return <Component border={border} notification={notification} />;
};

export default Notification;
