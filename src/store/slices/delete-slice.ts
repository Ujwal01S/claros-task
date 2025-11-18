import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DeleteDialogState {
  id: number | undefined;
  open: boolean;
  loading: boolean;
}

const initialState: DeleteDialogState = {
  id: undefined,
  open: false,
  loading: false,
};

const deleteSlice = createSlice({
  name: "deleteDialog",
  initialState,
  reducers: {
    openDeleteDialog: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
      state.open = true;
      state.loading = false;
    },
    closeDeleteDialog: (state) => {
      state.id = undefined;
      state.open = false;
      state.loading = false;
    },
    setDeleteLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetDeleteDialog: (state) => {
      state.id = undefined;
      state.open = false;
      state.loading = false;
    },
  },
});

export const {
  openDeleteDialog,
  closeDeleteDialog,
  setDeleteLoading,
  resetDeleteDialog,
} = deleteSlice.actions;
export default deleteSlice.reducer;
