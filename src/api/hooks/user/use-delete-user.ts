import { getUsersFn } from "@/api/functions/users";
import { notificationMessage } from "@/constants/notification-message.constant";
import { userQueryKey } from "@/constants/query-key.constant";
import { useAppDispatch } from "@/hooks/use-redux";
import { closeDeleteDialog } from "@/store/slices/delete-slice";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  // use mutation
  const { mutate, isPending } = useMutation<boolean, string, number>({
    mutationFn: (id: number) => getUsersFn.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userQueryKey.GET_ALL_USER],
      });

      dispatch(closeDeleteDialog());
      successNotification({
        header: "User",
        description: notificationMessage.userDeleteSuccess,
      });
    },

    onError: (error) => {
      errorNotification({
        header: "User",
        description: error || notificationMessage.userDeleteFail,
      });
      dispatch(closeDeleteDialog());
    },
  });

  return { mutate, isPending };
};
