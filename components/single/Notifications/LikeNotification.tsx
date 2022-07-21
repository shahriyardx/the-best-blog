import Link from "next/link";
import { BiLike } from "react-icons/bi";

type Props = {
  active: boolean;
};

const LikeNotification = ({ active }: Props) => {
  const fakeData = {
    user: {
      username: "test",
    },
    post: {
      id: "111",
      title: "Some post that is soo big and big big big in future too",
    },
  };

  return (
    <div
      className={`bg-zinc-700 hover:bg-zinc-600 p-3 rounded-md flex items-center gap-3 cursor-pointer`}
    >
      <div className="p-2 h-full aspect-square bg-zinc-500 text-white text-sm rounded-md">
        <BiLike />
      </div>
      <div className="text-zinc-300 text-xs">
        <p>
          <span className="font-semibold text-white">
            {fakeData.user.username}&nbsp;
          </span>
          <span>liked your post&nbsp;</span>
          <Link href="/" passHref>
            <a className="font-semibold text-blue-400">
              {fakeData.post.title.slice(0, 15)}...
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LikeNotification;
