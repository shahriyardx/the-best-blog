import { Category } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  refetch: () => void;
  categories: Pick<Category, "id" | "name" | "slug">[] | undefined;
};

const DashCategories = ({ categories, refetch }: Props) => {
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
    <div className="mt-10">
      <h1 className="text-2xl font-semibold dark:text-zinc-300">Categories</h1>

      <table className="rounded-md overflow-hidden w-full mt-5">
        <thead className="bg-zinc-700 text-white dark:bg-zinc-700">
          <th className="text-left px-4 py-2 whitespace-nowrap">Name</th>
          <th className="text-left px-4 py-2 whitespace-nowrap">Slug</th>
          <th className="text-left px-4 py-2 whitespace-nowrap">Actions</th>
        </thead>
        <tbody>
          {categories?.map((cat) => {
            return (
              <tr
                key={cat.id}
                className="even:bg-zinc-300 dark:text-zinc-300 dark:even:bg-zinc-800"
              >
                <td className="text-left px-4 py-2 whitespace-nowrap">
                  {cat.name}
                </td>
                <td className="text-left px-4 py-2 whitespace-nowrap">
                  {cat.slug}
                </td>
                <td className="text-left px-4 py-2 whitespace-nowrap">
                  {delId !== cat.id && (
                    <button
                      onClick={() => setDelId(cat.id)}
                      className="px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white"
                    >
                      Delete
                    </button>
                  )}
                  {delId === cat.id && (
                    <button
                      onClick={() => confirmDelete()}
                      className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                    >
                      Confim
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashCategories;
