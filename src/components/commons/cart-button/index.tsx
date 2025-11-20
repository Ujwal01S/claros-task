import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import {
  addToCart,
  completelyRemoveItem,
  selectCartItems,
} from "@/store/slices/cart-slice";
import type { IProduct } from "@/types/product.types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useMemo } from "react";

interface Props {
  product: IProduct;
  type?: "table" | "default";
}

const CartButton = ({ product, type = "default" }: Props) => {
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
    <>
      {type === "default" ? (
        <Button
          className="w-full rounded-none"
          onClick={handleCartAction}
          variant={isInCart ? "destructive" : "default"}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      ) : (
        <button
          onClick={handleCartAction}
          className="bg-gray-100 rounded border flex items-center gap-2 px-1"
        >
          <ShoppingCart
            className={`${isInCart ? "text-red-500" : "text-green-500"}`}
          />
          {isInCart ? (
            <Minus className="text-red-500" />
          ) : (
            <Plus className="text-green-400" />
          )}
        </button>
      )}
    </>
  );
};

export default CartButton;
