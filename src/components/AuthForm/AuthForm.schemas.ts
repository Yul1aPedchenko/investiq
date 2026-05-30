import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});

export const registerSchema = Yup.object({
  name: Yup.string().required("Обов'язкове поле"),
  email: Yup.string().email("Некоректний email").required("Обов'язкове поле"),
  password: Yup.string().min(6, "Мінімум 6 символів").required("Обов'язкове поле"),
});
