import { Formik, Form, Field } from "formik";

import { updateBalance } from "../../redux/auth/authOperations";

import { selectUser } from "../../redux/auth/authSelectors";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

import { Container } from "../../components/Container/Container";
import { BalanceHint } from "../../components/BalanceHint/BalanceHint";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { Summary } from "../../components/Summary/Summary";

import styles from "./DashboardPage.module.scss";

export const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");

  if (!user) return null;

  return (
    <section>
      <Container>
        <Formik
          enableReinitialize
          initialValues={{
            balance: user.balance,
          }}
          onSubmit={async (values) => {
            await dispatch(updateBalance(Number(values.balance))).unwrap();
          }}
        >
          <Form className={styles.balance}>
            <label className={styles.balance__title}>Баланс:</label>
            <div>
              <Field name="balance" type="number" min="0" required />
              <span>UAH</span>
            </div>
            <button type="submit">Підтвердити</button>
          </Form>
        </Formik>
      </Container>
      {user.balance === 0 && <BalanceHint />}
      <TransactionForm transactionType={transactionType} setTransactionType={setTransactionType} />
      <TransactionList type={transactionType} />
      <Summary />
    </section>
  );
};
