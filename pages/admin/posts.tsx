import AdminPage from "components/Layouts/AdminPage";
import { NextPage } from "next";

const Posts: NextPage & { requireAdmin: boolean } = () => {
  return (
    <AdminPage>
      <span>WTF</span>
    </AdminPage>
  );
};

Posts.requireAdmin = true;
export default Posts;
