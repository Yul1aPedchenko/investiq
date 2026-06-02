import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useAppDispatch } from "../../redux/hooks";

import { loginUser, registerUser } from "../../redux/auth/authOperations";
import type { AuthFormValues } from "../../types/auth";

import { Container } from "../../components/Container/Container";
import styles from "./AuthPage.module.scss";

export const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [serverError, setServerError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      setServerError("");
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

      navigate("/dashboard");
    } catch (error: any) {
      setServerError(error || "Something went wrong");
    }
  };
  return (
    <section className={styles.auth}>
      <Container>
        <div className={styles.auth__wrap}>
          <div className={styles.auth__logo}>
            <h1 className={styles.auth__logoText}>InvestIQ</h1>
            <p className={styles.auth__logoSubtext}>Smart Finance</p>
          </div>
          <AuthForm mode={mode} onModeChange={setMode} onSubmit={handleSubmit} error={serverError} />
        </div>
      </Container>
    </section>
  );
};
