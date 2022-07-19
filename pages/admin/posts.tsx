import { trpc } from "@utils/trpc";
import AdminPage from "components/Layouts/AdminPage";
import { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";

const Posts: NextPage & { requireAdmin: boolean } = () => {
  const [deleteId, setDeleteId] = useState<string>();
  const { data: posts, refetch } = trpc.useQuery(["admin.posts"]);
  const { mutate: deletePostById } = trpc.useMutation(
    ["admin.deletePostById"],
    {
      onSuccess: () => {
        refetch();
        toast.success("Post deleted");
      },
    }
  );

  const deletePost = () => {
    if (!deleteId) return;
    deletePostById({ post_id: deleteId });
  };

  return (
    <AdminPage>
      <h1 className="text-2xl font-bold dark:text-zinc-400">Posts</h1>

      <div className="mt-5">
        <div className="grid grid-cols-7 gap-5 text-white bg-zinc-700 px-5 py-3 mb-2">
          <div className="col-span-3">Title</div>
          <div>Category</div>
          <div>Author</div>
          <div className="col-span-2">Action</div>
        </div>
        <div>
          {posts?.map((post) => {
            return (
              <div className="grid grid-cols-7 gap-5 dark:text-zinc-300 px-5 py-3">
                <div className="col-span-3 truncate">{post.title}</div>
                <div>{post.Category.name}</div>
                <div>{post.author.username}</div>
                <div className="flex gap-2 items-center flex-wrap col-span-2">
                  {deleteId !== post.id && (
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white"
                    >
                      Delete
                    </button>
                  )}

                  {deleteId === post.id && (
                    <>
                      <button
                        onClick={deletePost}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => setDeleteId(undefined)}
                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminPage>
  );
};

Posts.requireAdmin = true;
export default Posts;
