import React, { ChangeEvent, useState } from "react";
import { NextPage } from "next";
import ProfilePage from "components/Layouts/ProfilePage";
import TextEditor from "components/single/TextEditor/TextEditor";
import { useForm } from "react-hook-form";
import { PostInput } from "@schema/post.schema";
import SEO from "components/single/SEO";
import { trpc } from "@utils/trpc";
import toast from "react-hot-toast";

const CreatePost: NextPage & { requireAuth: boolean } = () => {
  const [value, setValue] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostInput>();
  const { data: categories } = trpc.useQuery(["category.all"]);
  const { mutate } = trpc.useMutation(["posts.create"], {
    onSuccess: () => {
      reset();
      toast.success("Post created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const addPost = (data: PostInput) => {
    mutate({ ...data, content: value });
  };
  return (
    <ProfilePage>
      <SEO title="Create post" />
      <form onSubmit={handleSubmit(addPost)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="title" className="dark:text-zinc-200">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Title"
              className="placeholder-transparent bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            <p className="text-sm text-red-500">{errors.title?.message}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="dark:text-zinc-200">
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="Description"
              className="placeholder-transparent bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white"
              {...register("short_description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            />
            <p className="text-sm text-red-500">
              {errors.short_description?.message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="category" className="dark:text-zinc-200">
              Category
            </label>
            <select
              id="category"
              className="bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white"
              {...register("category_id", {
                required: true,
              })}
            >
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="visibility" className="dark:text-zinc-200">
              Visibility
            </label>
            <select
              id="visibility"
              className="bg-[bisque] dark:bg-zinc-800 text-zinc-800 dark:text-white"
              {...register("visibility", {
                required: true,
              })}
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
              <option value="UNLISTED">Unlisted</option>
            </select>
          </div>
        </div>

        <TextEditor
          value={value}
          setValue={(value: string | undefined) => setValue(value || "")}
        />

        <div>
          <button className="px-5 py-3 bg-[orange] text-white dark:bg-zinc-700">
            Create Post
          </button>
        </div>
      </form>
    </ProfilePage>
  );
};

CreatePost.requireAuth = true;
export default CreatePost;
