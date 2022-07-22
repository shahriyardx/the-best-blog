import SEO from "components/single/SEO";
import Blogs from "components/sections/Blogs/Blogs";
import Page from "components/Layouts/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import Link from "next/link";
import { BiChevronLeft } from "react-icons/bi";
import BlogLoading from "components/single/BlogLoading/BlogLoading";

const CategoryPosts: NextPage = () => {
  const router = useRouter();
  const { data: categories, isLoading } = trpc.useQuery(["category.all"], {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Page>Loading...</Page>;
  }

  const category = categories?.find(
    (cat) => cat.slug === router.query.category
  );

  if (!category) {
    router.push("/");
  }

  return (
    <Page>
      <SEO title={`Category : ${category?.name}`} />
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-base sm:text-2xl md:text-4xl font-bold dark:text-zinc-200 flex gap-2">
          <span>Category {"=>"}</span>
          <span className="text-blue-500">{category?.name}</span>
        </h1>

        <Link href="/">
          <a className="px-5 py-3 text-sm flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-300 rounded-full">
            <BiChevronLeft className="text-xl" />
            <span>Go Back</span>
          </a>
        </Link>
      </div>
      {isLoading && <BlogLoading />}
      <Blogs category={category} />
    </Page>
  );
};

export default CategoryPosts;
