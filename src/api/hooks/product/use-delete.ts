import { getProductFn } from "@/api/functions/products";
import { notificationMessage } from "@/constants/notification-message.constant";
import { productQueryKey } from "@/constants/query-key.constant";
import { usePaginationPrams } from "@/hooks/query-params/use-pagination";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { limit, offSet } = usePaginationPrams();
  const { mutate, isPending } = useMutation<boolean, string, number>({
    mutationFn: (id: number) => getProductFn.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productQueryKey.GET_ALL_PRODUCTS, limit, offSet],
      });
      successNotification({
        header: "Product",
        description: notificationMessage.productDeleteSuccess,
      });
    },

    onError: (error) => {
      errorNotification({
        header: "Product",
        description: error || notificationMessage.productDeleteFail,
      });
    },
  });

  return { mutate, isPending };
};
