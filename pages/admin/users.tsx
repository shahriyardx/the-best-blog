import { NextPage } from "next";
import AdminPage from "components/Layouts/AdminPage";

const DashboardUsers: NextPage & { requireAdmin: boolean } = () => {
  return (
    <AdminPage>
      <span>WTF</span>
    </AdminPage>
  );
};

DashboardUsers.requireAdmin = true;
export default DashboardUsers;
