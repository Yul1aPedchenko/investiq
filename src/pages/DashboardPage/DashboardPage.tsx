import { Formik, Form, Field } from "formik";

import { updateBalance } from "../../redux/auth/authOperations";

import { selectUser } from "../../redux/auth/authSelectors";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useState } from "react";

import { Container } from "../../components/Container/Container";
import { BalanceHint } from "../../components/BalanceHint/BalanceHint";
import { TransactionTypeSwitcher } from "../../components/TransactionTypeSwitcher/TransactionTypeSwitcher";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { Summary } from "../../components/Summary/Summary";

import { MdBarChart } from "react-icons/md";

import styles from "./DashboardPage.module.scss";

export const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");

  if (!user) return null;

  return (
    <section className={styles.dashboard}>
      <Container>
        <div className={styles.top}>
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

              <div className={styles.balance__wrap}>
                <div className={styles.balance__balance}>
                  {user.balance !== 0 ? (
                    <input
                      type="text"
                      value={Number(user.balance).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      disabled
                    />
                  ) : (
                    <Field name="balance" type="number" min="0" required />
                  )}
                  <span>UAH</span>
                </div>

                <button className={styles.balance__btn} type="submit" disabled={user.balance !== 0}>
                  Підтвердити
                </button>
              </div>
            </Form>
          </Formik>

          <button className={styles.balance__count}>
            Перейти до розрахунків
            <MdBarChart />
          </button>

          <button className={styles.balance__add}>Додати</button>

          {user.balance === 0 && <BalanceHint />}
        </div>

        <div className={styles.dashboard__out}>
          <div className={styles.dashboard__in}>
            <div className={styles.content}>
              <div className={styles.transactions}>
                <TransactionForm transactionType={transactionType}  />
                <TransactionList type={transactionType} />
              </div>
            </div>
          </div>
          <Summary />
        </div>
      </Container>
      <TransactionTypeSwitcher transactionType={transactionType} setTransactionType={setTransactionType} />
    </section>
  );
};
