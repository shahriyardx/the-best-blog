import React, { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { trpc } from "@utils/trpc";
import toast from "react-hot-toast";

type Props = {
  comment: {
    id: string;
    author: {
      username: string;
      id: string;
    };
    post_id: string;
    author_id: string;
    content: string;
  };
  refetch: () => void;
};

const PostComment = ({ comment, refetch }: Props) => {
  const { data: session } = useSession();
  const { mutate: deleteComment } = trpc.useMutation(["comments.deletebyId"], {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="bg-black/10 dark:bg-zinc-800 p-4 rounded-md max-w-[65ch]">
      <a
        href={`https://github.com/${comment.author.username}`}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-semibold text-blue-400 items-center gap-2 inline-flex"
      >
        <AiFillGithub className="text-xl text-black dark:text-white" />
        <span>{comment.author.username}</span>
      </a>

      <p className="dark:text-zinc-300 text-lg">{comment.content}</p>
      {session &&
        (session.profile.id === comment.author.id ||
          session.profile.is_admin) && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => deleteComment({ comment_id: comment.id })}
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          </div>
        )}
    </div>
  );
};

export default PostComment;
