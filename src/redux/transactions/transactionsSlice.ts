import { createSlice } from "@reduxjs/toolkit";

import { getTransactions, addTransaction, deleteTransaction } from "./transactionsOperations";

import type { TransactionsState } from "./types";

const initialState: TransactionsState = {
  items: [],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
