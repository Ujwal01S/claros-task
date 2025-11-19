import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DeleteDialogState {
  id: number | undefined;
  open: boolean;
}

const initialState: DeleteDialogState = {
  id: undefined,
  open: false,
};

const deleteSlice = createSlice({
  name: "deleteDialog",
  initialState,
  reducers: {
    openDeleteDialog: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
      state.open = true;
    },
    closeDeleteDialog: (state) => {
      state.id = undefined;
      state.open = false;
    },

    resetDeleteDialog: (state) => {
      state.id = undefined;
      state.open = false;
    },
  },
});

export const { openDeleteDialog, closeDeleteDialog, resetDeleteDialog } =
  deleteSlice.actions;
export default deleteSlice.reducer;
