import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counter-slice";
import { type RootState } from "@/types/store/counter";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
