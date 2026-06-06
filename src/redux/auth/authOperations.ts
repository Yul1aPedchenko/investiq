import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../services/authApi";
import type { LoginData, RegisterData, AuthResponse } from "./types";

export const getCurrentUser = createAsyncThunk("auth/current", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const r = await authApi.get("/auth/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return r.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const registerUser = createAsyncThunk<AuthResponse, RegisterData, { rejectValue: string }>("auth/register", async (credentials, thunkAPI) => {
  try {
    const { data } = await authApi.post<AuthResponse>("/auth/register", credentials);
    localStorage.setItem("token", data.token);

    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

export const loginUser = createAsyncThunk<AuthResponse, LoginData, { rejectValue: string }>("auth/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await authApi.post<AuthResponse>("/auth/login", credentials);
    localStorage.setItem("token", data.token);

    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const updateBalance = createAsyncThunk("auth/updateBalance", async (balance: number, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");

    const r = await authApi.patch(
      "users/balance",
      { balance },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return r.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});
