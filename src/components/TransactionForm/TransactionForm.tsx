import { Formik, Form, Field } from "formik";

import { getCurrentUser } from "../../redux/auth/authOperations";
import { addTransaction } from "../../redux/transactions/transactionsOperations";
import { useAppDispatch } from "../../redux/hooks";

import type { TransactionFormValues, TransactionFormProps } from "./TransactionForm.types";
import { expenseCategories, incomeCategories } from "./categories";

import styles from "./TransactionForm.module.scss";

export const TransactionForm = ({ transactionType }: TransactionFormProps) => {
  const dispatch = useAppDispatch();

  const initialValues: TransactionFormValues = {
    type: transactionType,
    description: "",
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          try {
            await dispatch(addTransaction({ ...values, type: transactionType })).unwrap();
            await dispatch(getCurrentUser()).unwrap();

            resetForm();
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ resetForm }) => (
          <Form className={styles.form__form}>
            <Field className={styles.form__desc} name="description" placeholder="Опис товару" required />

            <Field className={styles.form__category} as="select" name="category" required>
              <option value="" disabled>
                Категорія товару
              </option>

              {(transactionType === "expense" ? expenseCategories : incomeCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Field>

            <div className={styles.form__wrap}>
              <Field className={styles.form__amount} name="amount" type="number" placeholder="00.00 UAH" min="0.01" step="0.01" required />

              <Field className={styles.form__date} name="date" type="date" required />
            </div>
            <div className={styles.form__btnWrap}>
              <button className={styles.form__active} type="submit">
                Ввести
              </button>

              <button className={styles.form__btn} type="button" onClick={() => resetForm()}>
                Очистити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
