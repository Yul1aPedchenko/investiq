import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useAppDispatch } from "../../redux/hooks";

import { loginUser, registerUser } from "../../redux/auth/authOperations";
import type { AuthFormValues } from "../../types/auth";

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      if (mode === "login") {
        await dispatch(
          loginUser({
            email: values.email,
            password: values.password,
          }),
        ).unwrap();
      }

      if (mode === "register") {
        await dispatch(
          registerUser({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        ).unwrap();
      }

      // navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return <AuthForm mode={mode} onModeChange={setMode} onSubmit={handleSubmit} />;
};
