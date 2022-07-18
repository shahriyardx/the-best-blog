import React from "react";
import moment from "moment";
import Markdown from "marked-react";
import { BiUser, BiTime } from "react-icons/bi";
//@ts-ignore
import Lowlight from "react-lowlight"; //@ts-ignore
import python from "highlight.js/lib/languages/python"; //@ts-ignore
import markdown from "highlight.js/lib/languages/markdown"; //@ts-ignore
import javascript from "highlight.js/lib/languages/javascript"; //@ts-ignore

import "highlight.js/styles/atom-one-dark.css";
import { Post, Comment, Like, Category, User } from "@prisma/client";
import { ISODateString } from "next-auth";

Lowlight.registerLanguage("js", javascript);
Lowlight.registerLanguage("py", python);
Lowlight.registerLanguage("md", markdown);

interface Props {
  post: Post & {
    Category: Category;
    likes: Like[];
    comments: Comment[];
    author: User;
    created_at: ISODateString;
  };
}

const PostPreview = ({ post }: Props) => {
  const renderer = {
    code(snippet: string, lang: string) {
      return <Lowlight key={snippet} language={lang} value={snippet} />;
    },
  };

  return (
    <div>
      <h1 className="text-4xl font-black text-zinc-900 dark:text-zinc-300">
        {post.title}
      </h1>

      <div className="flex gap-3 dark:text-zinc-400 mt-2">
        <div className="flex gap-2 items-center">
          <BiUser />
          <span>{post.author?.username}</span>
        </div>

        <div className="flex gap-2 items-center">
          <BiTime />
          <span>{moment(post.created_at).format("MMMM DD, YYYY")}</span>
        </div>
      </div>

      <div
        className="
          prose dark:prose-invert prose-blue 
          dark:prose-headings:text-zinc-400 mt-10 
          md:prose-lg max-w-full prose-img:w-full
          dark:prose-p:text-zinc-500 prose-code:text-blue-500 dark:prose-code:text-blue-300
          dark:prose-blockquote:bg-zinc-800 prose-blockquote:bg-zinc-200 prose-blockquote:border-l-zinc-500
        "
      >
        <Markdown renderer={renderer}>{post.content}</Markdown>
      </div>
    </div>
  );
};

export default PostPreview;
