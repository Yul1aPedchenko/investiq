import { Formik, Form, Field } from "formik";

import { updateBalance } from "../../../redux/auth/authOperations";
import { selectUser } from "../../../redux/auth/authSelectors";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "./Balance.module.scss";

type BalanceProps = {
  showBtn?: boolean;
};

export const Balance = ({ showBtn = true }: BalanceProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  if (!user) return null;
  return (
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

          {showBtn && (
            <button className={styles.balance__btn} type="submit" disabled={user.balance !== 0}>
              Підтвердити
            </button>
          )}
        </div>
      </Form>
    </Formik>
  );
};
