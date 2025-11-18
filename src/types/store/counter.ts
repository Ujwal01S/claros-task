import type { DeleteDialogState } from "./delete-dialog";

export interface CounterState {
  value: number;
}

export interface RootState {
  counter: CounterState;
  deleteDialog: DeleteDialogState;
}
