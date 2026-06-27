import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/authSlice";
import { transactionsReducer } from "./transactions/transactionsSlice";
import { loaderReducer } from "./loader/loaderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
