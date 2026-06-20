import { useEffect, useMemo, useState } from "react";

import { getTransactions } from "../../redux/transactions/transactionsOperations";
import { selectTransactions } from "../../redux/transactions/transactionsSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Container } from "../../components/Container/Container";
import { StatisticsTop } from "../../components/Statistics/StatisticsTop/StatisticsTop";
import { StatisticsCategories } from "../../components/Statistics/StatisticsCategories/StatisticsCategories";

import styles from './StatisticsPage.module.scss';

export const StatisticsPage = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentMonthTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      return date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
    });
  }, [transactions, selectedDate]);

  return (
    <section className={styles.statistics}>
      <Container>
        <StatisticsTop transactions={currentMonthTransactions} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <StatisticsCategories transactions={currentMonthTransactions} />
      </Container>
    </section>
  );
};
