import { Formik, Form, Field } from "formik";

import { addTransaction } from "../../redux/transactions/transactionsOperations";
import { useAppDispatch } from "../../redux/hooks";

import type { TransactionFormValues } from "./TransactionForm.types";
import { expenseCategories, incomeCategories } from "./categories";

export const TransactionForm = () => {
  const dispatch = useAppDispatch();

  const initialValues: TransactionFormValues = {
    type: "expense",
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
            await dispatch(addTransaction(values)).unwrap();

            resetForm({
              values: initialValues,
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <label>
                <Field type="radio" name="type" value="expense" />
                Витрата
              </label>
              <label>
                <Field type="radio" name="type" value="income" />
                Дохід
              </label>
            </div>

            <Field name="description" placeholder="Опис" required />
            <Field as="select" name="category" required>
              <option value="" disabled>Оберіть категорію</option>

              {(values.type === "expense" ? expenseCategories : incomeCategories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            <Field name="amount" type="number" placeholder="Сума" min="0.01" step="0.01" required />
            <Field name="date" type="date" required />

            <button type="submit">Додати</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
