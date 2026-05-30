import axios from "axios";

import type { RegisterData } from "./authApi.types";

export const authApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const registerRequest = async (data: RegisterData) => {
  const r = await authApi.post("/auth/register", data);

  return r.data;
};
