import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Post, Comment, Like, User } from "@prisma/client";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { trpc } from "@utils/trpc";

interface Props {
  post_id: string;
  likes: Pick<Like, "user_id" | "post_id">[];
  comments: Pick<
    Comment & { author: Pick<User, "username"> },
    "author_id" | "post_id" | "content"
  >[];
  refetch: () => void;
}

const LikesAndComments = ({ likes, comments, refetch, post_id }: Props) => {
  const [liking, setLiking] = useState<boolean>(false);
  const { mutate: likePost } = trpc.useMutation(["posts.toggleLike"], {
    onSuccess: () => {
      refetch();
      setLiking(false);
    },
    onError: () => {
      setLiking(false);
    },
  });
  const { data: session } = useSession();

  const liked = () => {
    return likes.find((like) => like?.user_id === session?.profile?.id)
      ? true
      : false;
  };

  const LikeIcon = liking
    ? AiOutlineLoading3Quarters
    : liked()
    ? AiFillHeart
    : AiOutlineHeart;

  const addLike = async () => {
    setLiking(true);
    likePost({ post_id });
  };

  return (
    <div className="py-5 xl:py-0 flex items-center gap-5 dark:border-b-zinc-800 dark:border-t-zinc-800 border-b-2 border-t-2 mb-5 xl:border-b-0 xl:border-t-0">
      <button
        onClick={addLike}
        className={`flex items-center gap-2 text-lg rounded-md ${
          liking && "cursor-wait"
        }`}
      >
        <LikeIcon
          className={`${liked() && !liking && "text-red-500"} ${
            liking && "animate-spin"
          } text-2xl`}
        />

        <span className="font-semibold dark:text-zinc-300">
          {likes.length} {liking ? "Wait" : "Likes"}
        </span>
      </button>

      <button className="flex items-center gap-2 text-lg rounded-md">
        <AiOutlineComment className="text-2xl" />
        <span className="font-semibold dark:text-zinc-300">
          {comments.length} Comments
        </span>
      </button>
    </div>
  );
};

export default LikesAndComments;
