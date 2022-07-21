import Link from "next/link";
import { BiUserPlus } from "react-icons/bi";

type Props = {
  active: boolean;
};

const FollowNotification = ({ active }: Props) => {
  const fakeData = {
    user: {
      username: "test",
    },
  };

  return (
    <div className="bg-zinc-700 hover:bg-zinc-600 p-3 rounded-md flex items-center gap-3 cursor-pointer">
      <div className="p-2 h-full aspect-square bg-zinc-500 text-white text-sm rounded-md">
        <BiUserPlus />
      </div>
      <div className="text-zinc-300 text-xs">
        <p>
          <span className="font-semibold text-white">
            {fakeData.user.username}&nbsp;
          </span>
          <span>started following you</span>
        </p>
      </div>
    </div>
  );
};

export default FollowNotification;
