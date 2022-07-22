import { trpc } from "@utils/trpc";
import AdminPage from "components/Layouts/AdminPage";
import CategoryForm from "components/single/CategoryForm/CategoryForm";
import { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";

const Categories: NextPage & { requireAdmin: boolean } = () => {
  const { data: categories, refetch } = trpc.useQuery(["category.all"], {
    refetchOnWindowFocus: false,
  });
  const [delId, setDelId] = useState<string>();
  const { mutate } = trpc.useMutation(["category.deleteById"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (error) => {
      refetch();
    },
  });

  const confirmDelete = () => {
    if (!delId) return;
    mutate({ category_id: delId });
  };

  return (
    <AdminPage>
      <CategoryForm refetch={refetch} />
      <h1 className="text-2xl font-bold dark:text-zinc-400 mt-5">Categories</h1>

      <div className="mt-5">
        <div className="grid grid-cols-3 gap-5 text-white bg-zinc-700 px-5 py-3 mb-2">
          <div>Name</div>
          <div>Slug</div>
          <div>Action</div>
        </div>
        <div>
          {categories?.map((cat) => {
            return (
              <div
                key={cat.id}
                className="grid grid-cols-3 gap-5 dark:text-zinc-300 px-5 py-3"
              >
                <div className="flex items-center gap-2">
                  <span>{cat.name}</span>
                  <span className="text-sm px-3 py-1 bg-zinc-600 rounded-full">
                    {cat.posts?.length} posts
                  </span>
                </div>
                <div>{cat.slug}</div>
                <div className="flex gap-2 items-center flex-wrap">
                  {delId !== cat.id && (
                    <button
                      onClick={() => setDelId(cat.id)}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white"
                    >
                      Delete
                    </button>
                  )}

                  {delId === cat.id && (
                    <>
                      <button
                        onClick={() => confirmDelete()}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white"
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() => setDelId(undefined)}
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

Categories.requireAdmin = true;
export default Categories;
