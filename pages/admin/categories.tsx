import { trpc } from "@utils/trpc";
import AdminPage from "components/Layouts/AdminPage";
import DashCategories from "components/sections/DashCategories/DashCategories";
import CategoryForm from "components/single/CategoryForm/CategoryForm";
import { NextPage } from "next";

const Categories: NextPage = () => {
  const { data: categories, refetch } = trpc.useQuery(["category.all"]);

  return (
    <AdminPage>
      <CategoryForm refetch={refetch} />
      <DashCategories categories={categories} refetch={refetch} />
    </AdminPage>
  );
};

export default Categories;
