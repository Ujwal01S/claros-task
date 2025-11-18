import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter-slice";
import deleteReducer from "./slices/delete-slice";
import { type RootState } from "@/types/store/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    deleteDialog: deleteReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
