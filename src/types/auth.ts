export type AuthMode = "login" | "register";

export interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}
