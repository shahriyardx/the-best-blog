import { trpc } from "@utils/trpc";

const useNotifications = () => {
  const { data: notifications , refetch } = trpc.useQuery(
    ["user.myNotifications"],
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: markRead } = trpc.useMutation(["notification.markRead"], {
    onSuccess: () => {
      refetch();
    },
  });

  return { notifications, refetch, markRead };
};

export default useNotifications;
