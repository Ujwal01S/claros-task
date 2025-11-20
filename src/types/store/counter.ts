import type { DeleteDialogState } from "./delete-dialog";
import type { CartState } from "@/store/slices/cart-slice";

export interface CounterState {
  value: number;
}

export interface RootState {
  counter: CounterState;
  deleteDialog: DeleteDialogState;
  cart: CartState;
}
