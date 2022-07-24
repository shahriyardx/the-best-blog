import AdminPage from "components/Layouts/AdminPage";
import { NextPage } from "next";

const Dashboard: NextPage & { requireAdmin: boolean } = () => {
  return (
    <AdminPage>
      <span>Work in progress</span>
    </AdminPage>
  );
};

Dashboard.requireAdmin = true;
export default Dashboard;
