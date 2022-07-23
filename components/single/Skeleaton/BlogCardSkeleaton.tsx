import React from "react";

const BlogCardSkeleaton = () => {
  return (
    <div className="animate-pulse">
      <div
        className="p-2 rounded-md bg-zinc-400 dark:bg-zinc-800"
        style={{
          width: "100%",
          maxWidth: "300px",
        }}
      />
      <div
        className="bg-zinc-300 dark:bg-zinc-700 rounded-md mt-3 w-24 p-2"
        style={{ width: "80px" }}
      />

      <div></div>
      <p className="mt-1 max-w-[65ch] underline decoration-4 text-transparent decoration-neutral-400 dark:decoration-zinc-700 leading-5 select-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ipsam,
        aperiam accusamus reprehenderit dolores et. Alias minus recusandae,
        delectus repellendus.
      </p>
    </div>
  );
};

export default BlogCardSkeleaton;
