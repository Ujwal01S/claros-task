import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addToCart,
  completelyRemoveItem,
  selectCartItems,
} from "@/store/slices/cart-slice";
import type { IProduct } from "@/types/product.types";
import { useMemo } from "react";

interface Props {
  product: IProduct;
}

const CartButton = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  // does product exist in cart check
  const isInCart = useMemo(
    () => cartItems.some((item) => item.id === product.id),
    [cartItems, product.id],
  );

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(completelyRemoveItem(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <Button
      className="w-full rounded-none"
      onClick={handleCartAction}
      variant={isInCart ? "destructive" : "default"}
    >
      {isInCart ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
};

export default CartButton;
