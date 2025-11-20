import { getProductFn } from "@/api/functions/products";
import { notificationMessage } from "@/constants/notification-message.constant";
import { productQueryKey } from "@/constants/query-key.constant";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  completelyRemoveItem,
  selectCartItems,
} from "@/store/slices/cart-slice";
import { closeDeleteDialog } from "@/store/slices/delete-slice";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  const { id: idToDelete } = useAppSelector((state) => state.deleteDialog);
  const cartItems = useAppSelector(selectCartItems);

  //   delete mutation
  const { mutate, isPending } = useMutation<boolean, string, number>({
    mutationFn: (id: number) => getProductFn.deleteProduct(id),
    onSuccess: () => {
      // Check if any cart item has this category
      const itemExistsInCart = cartItems.find(
        (item) => item?.id === idToDelete,
      );
      console.log("Here");
      console.log({ itemExistsInCart });

      // If found, remove it from cart
      if (itemExistsInCart) {
        dispatch(completelyRemoveItem(itemExistsInCart.id));
      }
      queryClient.invalidateQueries({
        queryKey: [productQueryKey.GET_ALL_PRODUCTS],
      });
      queryClient.refetchQueries({
        queryKey: [productQueryKey.GET_ALL_PRODUCTS],
        type: "active",
      });
      dispatch(closeDeleteDialog());
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
