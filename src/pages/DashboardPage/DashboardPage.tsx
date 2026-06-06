import { Formik, Form, Field } from "formik";

import { updateBalance } from "../../redux/auth/authOperations";

import { selectUser } from "../../redux/auth/authSelectors";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import { Container } from "../../components/Container/Container";
import { BalanceHint } from "../../components/BalanceHint/BalanceHint";

import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (!user) return null;

  return (
    <section>
      <Container>
        <Formik
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
    </section>
  );
};
