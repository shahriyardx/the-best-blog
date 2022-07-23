import { trpc } from "@utils/trpc";

const useNotifications = () => {
  const { data: notifications, refetch } = trpc.useQuery(
    ["user.myNotifications"],
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: allnotifications, refetch: refetchAll } = trpc.useQuery(
    ["user.myNotifications"],
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: markRead } = trpc.useMutation(["notification.markRead"], {
    onSuccess: () => {
      refetch();
      refetchAll();
    },
  });

  return { notifications, allnotifications, refetch, refetchAll, markRead };
};

export default useNotifications;
