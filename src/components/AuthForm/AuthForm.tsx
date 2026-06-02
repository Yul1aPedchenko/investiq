import { Formik, Form, Field } from "formik";
import { loginSchema, registerSchema } from "./AuthForm.schemas";

import type { AuthFormProps } from "./AuthForm.types";
import google from "../../assets/google.svg";

import styles from "./AuthForm.module.scss";

export const AuthForm = ({ mode, onModeChange, onSubmit, error }: AuthFormProps) => {
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
        <Form className={styles.form}>
          <div>
            <p className={styles.form__text}>Ви можете авторизуватися за допомогою акаунта Google</p>
            <div title="Not allowed now">
              <button className={styles.form__btn} disabled>
                <img className={styles.form__icon} src={google} alt="google icon" />
                Google
              </button>
            </div>

            <p className={styles.form__text}>Або увійти за допомогою ел. пошти та праолю після реєстрації</p>
          </div>

          {!isLogin && (
            <div className={styles.form__row}>
              <label className={styles.form__label}>Ім'я</label>
              <Field className={styles.form__input} name="name" type="text" placeholder="Your name" />
              {touched.name && errors.name && <p className={styles.form__error}>{errors.name}</p>}
            </div>
          )}

          <div className={styles.form__row}>
            <label className={styles.form__label}>Електронна пошта</label>
            <Field className={styles.form__input} name="email" type="email" placeholder="your@email.com" />
            {touched.email && errors.email && <p className={styles.form__error}>{errors.email}</p>}
          </div>

          <div className={styles.form__row}>
            <label className={styles.form__label}>Пароль</label>
            <Field className={styles.form__input} name="password" type="password" placeholder="••••••••" />
            {touched.password && errors.password && <p className={styles.form__error}>{errors.password}</p>}
          </div>

          <div className={styles.form__btns}>
            <button className={styles.form__btn} type={isLogin ? "submit" : "button"} onClick={() => onModeChange("login")}>
              УВІЙТИ
            </button>

            <button className={styles.form__btn} type={!isLogin ? "submit" : "button"} onClick={() => onModeChange("register")}>
              РЕЄСТРАЦІЯ
            </button>
          </div>
          {error && <p className={styles.form__error}>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};
