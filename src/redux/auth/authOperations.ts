import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../services/authApi";
import type { LoginData, RegisterData, AuthResponse } from "./types";

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
