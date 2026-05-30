import type { AuthFormValues } from "../../types/auth";

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthFormProps {
  mode: 'login' | 'register';
  onModeChange: (mode: 'login' | 'register') => void;
  onSubmit: (values: AuthFormValues) => Promise<void>;
}
