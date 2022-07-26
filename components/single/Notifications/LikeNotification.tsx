import { Notification, User } from "@prisma/client";
import Link from "next/link";
import { BiLike } from "react-icons/bi";

type Props = {
  notification: Notification & { from: Pick<User, "username"> };
  border?: boolean;
};

const LikeNotification = ({ notification, border }: Props) => {
  return (
    <div
      className={`bg-zinc-700 hover:bg-zinc-600 p-3 rounded-md flex items-center gap-3 cursor-pointer ${
        border && "border-2 border-zinc-500"
      }`}
    >
      <div className="p-2 h-full aspect-square bg-zinc-500 text-white text-sm rounded-md">
        <BiLike />
      </div>
      <div className="text-zinc-300 text-xs">
        <Link href={`/p/${notification.post_id}`}>
          <a>
            <span className="font-semibold text-white">
              {notification.from.username}&nbsp;
            </span>
            <span>liked your post&nbsp;</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LikeNotification;
