
import { selectUser } from "../../redux/auth/authSelectors";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/Container/Container";
import { Balance } from "../../components/Dashboard/Balance/Balance";
import { BalanceHint } from "../../components/BalanceHint/BalanceHint";
import { TransactionTypeSwitcher } from "../../components/TransactionTypeSwitcher/TransactionTypeSwitcher";
import { TransactionForm } from "../../components/TransactionForm/TransactionForm";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { Summary } from "../../components/Summary/Summary";

import { MdBarChart } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";

import styles from "./DashboardPage.module.scss";

export const DashboardPage = () => {
  const user = useAppSelector(selectUser);
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");

  const [isAdd, setIsAdd] = useState<boolean>(false);

  if (!user) return null;

  return (
    <section className={styles.dashboard}>
      <Container>
        <div className={styles.dashboard__wrap}>
          {!isAdd && (
            <div className={styles.top}>
              <Balance />

              <button className={styles.balance__count} onClick={() => navigate("/statistics")}>
                Перейти до розрахунків
                <MdBarChart />
              </button>

              <button className={styles.balance__add} onClick={() => setIsAdd(true)}>
                Додати
              </button>

              {user.balance === 0 && <BalanceHint />}
            </div>
          )}

          <div className={styles.dashboard__subwrap}>
            <div className={styles.dashboard__switcher}>
              <TransactionTypeSwitcher transactionType={transactionType} setTransactionType={setTransactionType} />
            </div>
            <div className={styles.dashboard__out}>
              <div className={styles.dashboard__in}>
                <div className={styles.transactions}>
                  {isAdd && (
                    <button onClick={() => setIsAdd(false)} className={styles.transactions__btn}>
                      <IoIosArrowRoundBack />
                    </button>
                  )}
                  <div className={!isAdd ? styles.transactions__form : ""}>
                    <TransactionForm transactionType={transactionType} />
                  </div>

                  {!isAdd && <TransactionList type={transactionType} />}
                </div>
              </div>
              {!isAdd && <Summary />}
            </div>
          </div>
        </div>
      </Container>
      <div className={styles.dashboard__bottom}>{!isAdd && <TransactionTypeSwitcher transactionType={transactionType} setTransactionType={setTransactionType} />}</div>
    </section>
  );
};
