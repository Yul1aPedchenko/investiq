import { useEffect } from "react";

import { getCurrentUser } from "../../redux/auth/authOperations";
import { getTransactions, deleteTransaction } from "../../redux/transactions/transactionsOperations";

import { selectTransactions } from "../../redux/transactions/transactionsSelectors";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import type { TransactionListProps } from "./Transaction.types";

import { RiDeleteBinLine } from "react-icons/ri";
import styles from "./TransactionList.module.scss";

export const TransactionList = ({ type }: TransactionListProps) => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
      await dispatch(getTransactions()).unwrap();
      await dispatch(getCurrentUser()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTransactions = transactions.filter((transaction) => transaction.type === type);
  return (
    <ul className={styles.transactions}>
      {filteredTransactions.map((transaction) => (
        <li className={styles.transactions__item} key={transaction._id}>
          <div className={styles.transactions__wrap}>
            <div className={styles.transactions__subwrap}>
              <div className={styles.transactions__date}>{new Date(transaction.date).toLocaleDateString()}</div>
              <div className={styles.transactions__desc}>{transaction.description}</div>
            </div>
            <div className={styles.transactions__category}>{transaction.category}</div>
          </div>
          <div>
            <div>
              {transaction.type === "income" ? "" : "-"} {transaction.amount} UAH
            </div>

            <button onClick={() => handleDelete(transaction._id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
