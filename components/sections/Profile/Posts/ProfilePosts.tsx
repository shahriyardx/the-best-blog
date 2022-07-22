import React from "react";
import { trpc } from "@utils/trpc";
import ProfilePost from "components/single/ProfilePost/ProfilePost";

const ProfilePosts = () => {
  const { data: posts, refetch } = trpc.useQuery(["user.posts"], {
    refetchOnWindowFocus: false,
  });

  return (
    <section className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-10 dark:text-zinc-300">
        Your Posts
      </h1>
      {!posts?.length && <p className="dark:text-zinc-400">No posts found</p>}
      <div className="flex flex-col gap-8">
        {posts?.map((post) => (
          <ProfilePost post={post} key={post.id} refetch={refetch} />
        ))}
      </div>
    </section>
  );
};

export default ProfilePosts;
