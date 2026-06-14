import { Formik, Form, Field } from "formik";

import { getCurrentUser } from "../../redux/auth/authOperations";
import { addTransaction } from "../../redux/transactions/transactionsOperations";
import { useAppDispatch } from "../../redux/hooks";

import type { TransactionFormValues, TransactionFormProps } from "./TransactionForm.types";
import { expenseCategories, incomeCategories } from "./categories";

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
            resetForm({
              values: initialValues,
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Form>
          <Field name="description" placeholder="Опис" required />
          <Field as="select" name="category" required>
            <option value="" disabled>
              Оберіть категорію
            </option>

            {(transactionType === "expense" ? expenseCategories : incomeCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Field>
          <Field name="amount" type="number" placeholder="Сума" min="0.01" step="0.01" required />
          <Field name="date" type="date" required />

          <button type="submit">Додати</button>
        </Form>
      </Formik>
    </div>
  );
};
