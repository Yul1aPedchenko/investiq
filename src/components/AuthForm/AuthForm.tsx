import { Formik, Form, Field } from "formik";
import { loginSchema, registerSchema } from "./AuthForm.schemas";

import type { AuthFormProps } from "./AuthForm.types";

export const AuthForm = ({ mode, onModeChange, onSubmit }: AuthFormProps) => {
  const isLogin = mode === "login";
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={async (values) => {
        await onSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <h2>Ви можете авторизуватися за допомогою акаунта Google</h2>
            <button disabled>Google</button>
            <h2>Або увійти за допомогою ел. пошти та праолю після реєстрації</h2>
          </div>

          {!isLogin && (
            <>
              <label>Ім'я</label>
              <Field name="name" type="text" placeholder="Your name" />
              {touched.name && errors.name && <p>{errors.name}</p>}
            </>
          )}

          <label>Електронна пошта</label>
          <Field name="email" type="email" placeholder="your@email.com" />
          {touched.email && errors.email && <p>{errors.email}</p>}

          <label>Пароль</label>
          <Field name="password" type="password" placeholder="••••••••" />
          {touched.password && errors.password && <p>{errors.password}</p>}

          <div>
            <button type={isLogin ? "submit" : "button"} onClick={() => onModeChange("login")}>
              УВІЙТИ
            </button>

            <button type={!isLogin ? "submit" : "button"} onClick={() => onModeChange("register")}>
              РЕЄСТРАЦІЯ
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
