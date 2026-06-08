import type { RootState } from "../store";

export const selectTransactions = (state: RootState) => state.transactions.items;

export const selectTrnasactionsLoading = (state: RootState) => state.transactions.isLoading;
