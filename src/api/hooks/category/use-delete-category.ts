import { getCategoryFn } from "@/api/functions/category";
import { notificationMessage } from "@/constants/notification-message.constant";
import { categoryQueryKey } from "@/constants/query-key.constant";
import { useAppDispatch } from "@/hooks/use-redux";
import { closeDeleteDialog } from "@/store/slices/delete-slice";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  //   mutation query
  const { mutate, isPending } = useMutation<boolean, string, number>({
    mutationFn: (id: number) => getCategoryFn.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [categoryQueryKey.GET_ALL_CATEGORY],
      });
      queryClient.refetchQueries({
        queryKey: [categoryQueryKey.GET_ALL_CATEGORY],
        type: "active",
      });

      dispatch(closeDeleteDialog());
      successNotification({
        header: "Category",
        description: notificationMessage.categoryDeleteSuccess,
      });
    },

    onError: (error) => {
      errorNotification({
        header: "Category",
        description: error || notificationMessage.categoryDeleteFail,
      });
      dispatch(closeDeleteDialog());
    },
  });

  return { mutate, isPending };
};
