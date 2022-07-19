import { NextPage } from "next";
import AdminPage from "components/Layouts/AdminPage";
import { trpc } from "@utils/trpc";
import { useState } from "react";
import toast from "react-hot-toast";

const DashboardUsers: NextPage & { requireAdmin: boolean } = () => {
  const [deleteId, setDeleteId] = useState<string>();
  const { data: users, refetch } = trpc.useQuery(["admin.allUsers"]);

  const { mutate: deleteUserById } = trpc.useMutation(
    ["admin.deleteUserById"],
    {
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: makeAdmin } = trpc.useMutation(["admin.makeUserAdmin"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: removeAdmin } = trpc.useMutation(["admin.removeUserAdmin"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: activate } = trpc.useMutation(["admin.activateUser"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deactivate } = trpc.useMutation(["admin.deactivateUser"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const deleteUser = () => {
    if (!deleteId) return;
    deleteUserById({ user_id: deleteId });
  };

  return (
    <AdminPage>
      <h1 className="text-2xl font-bold dark:text-zinc-400">users</h1>

      <div className="mt-5">
        <div className="grid grid-cols-4 gap-5 text-white bg-zinc-700 px-5 py-3 mb-2">
          <div>Username</div>
          <div>Admin?</div>
          <div>Active?</div>
          <div>Action</div>
        </div>
        <div>
          {users?.map((user) => {
            return (
              <div
                key={user.id}
                className="grid grid-cols-4 gap-5 dark:text-zinc-300 px-5 py-3"
              >
                <div className="truncate">{user.username}</div>
                <div>
                  {user.is_admin ? (
                    <button
                      onClick={() => removeAdmin({ user_id: user.id })}
                      className="text-red-500"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdmin({ user_id: user.id })}
                      className="text-yellow-500"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
                <div>
                  {user.is_active ? (
                    <button
                      onClick={() => deactivate({ user_id: user.id })}
                      className="text-red-500"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => activate({ user_id: user.id })}
                      className="text-green-500"
                    >
                      Activate
                    </button>
                  )}
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  {deleteId !== user.id && (
                    <button
                      onClick={() => setDeleteId(user.id)}
                      className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded-md text-white"
                    >
                      Delete
                    </button>
                  )}

                  {deleteId === user.id && (
                    <>
                      <button
                        onClick={deleteUser}
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

DashboardUsers.requireAdmin = true;
export default DashboardUsers;
