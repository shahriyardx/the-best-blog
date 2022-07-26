import AdminPage from "components/Layouts/AdminPage";
import { NextPage } from "next";

const Dashboard: NextPage & { requireAdmin: boolean } = () => {
  return (
    <AdminPage>
      <span className="dark:text-zinc-300">Work in progress</span>
    </AdminPage>
  );
};

Dashboard.requireAdmin = true;
export default Dashboard;
