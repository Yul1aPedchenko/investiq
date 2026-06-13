import { createAsyncThunk } from "@reduxjs/toolkit";

import { authApi } from "../../services/authApi";

import type { TransactionFormValues } from "../../components/TransactionForm/TransactionForm.types";

export const getTransactions = createAsyncThunk("transactions/getAll", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const r = await authApi.get("/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return r.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const addTransaction = createAsyncThunk("transactions/add", async (transaction: TransactionFormValues, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const r = await authApi.post("/transactions", transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return r.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const deleteTransaction = createAsyncThunk("transactions/delete", async (id: string, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    await authApi.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});
