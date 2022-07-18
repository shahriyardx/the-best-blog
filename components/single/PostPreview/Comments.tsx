import PostComment from "components/single/PostComment/PostComment";
import React from "react";

type Props = {
  comments: {
    id: string;
    author: {
      username: string;
      id: string;
    };
    post_id: string;
    author_id: string;
    content: string;
  }[];
  refetch: () => void;
};

const Comments = ({ comments, refetch }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {comments?.map((comment) => (
        <PostComment refetch={refetch} comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default Comments;
