import { useMemo, useState, useEffect } from "react";

import { Container } from "../../components/Container/Container";
import { StatisticsTop } from "../../components/Statistics/StatisticsTop/StatisticsTop";
import { StatisticsCategories } from "../../components/Statistics/StatisticsCategories/StatisticsCategories";

import { getTransactions } from "../../redux/transactions/transactionsOperations";
import { selectTransactions } from "../../redux/transactions/transactionsSelectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import styles from './StatisticsPage.module.scss';

export const StatisticsPage = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const availableMonths = useMemo(() => {
    return [
      ...new Set(
        transactions.map((transaction) => {
          const date = new Date(transaction.date);

          return `${date.getFullYear()}-${date.getMonth()}`;
        }),
      ),
    ].sort();
  }, [transactions]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (!availableMonths.length) return;

    const [year, month] = availableMonths.at(-1)!.split("-").map(Number);

    setSelectedDate(new Date(year, month));
  }, [availableMonths]);

  const currentIndex = availableMonths.indexOf(`${selectedDate.getFullYear()}-${selectedDate.getMonth()}`);

  const prevMonth = () => {
    if (currentIndex <= 0) return;

    const [year, month] = availableMonths[currentIndex - 1].split("-").map(Number);

    setSelectedDate(new Date(year, month));
  };

  const nextMonth = () => {
    if (currentIndex >= availableMonths.length - 1) return;

    const [year, month] = availableMonths[currentIndex + 1].split("-").map(Number);

    setSelectedDate(new Date(year, month));
  };

  const currentMonthTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      return date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear();
    });
  }, [transactions, selectedDate]);

  return (
    <section className={styles.statistics}>
      <Container>
        <StatisticsTop transactions={currentMonthTransactions} selectedDate={selectedDate} prevMonth={prevMonth} nextMonth={nextMonth} disablePrev={currentIndex <= 0} disableNext={currentIndex >= availableMonths.length - 1} />

        <StatisticsCategories transactions={currentMonthTransactions} />
      </Container>
    </section>
  );
};
