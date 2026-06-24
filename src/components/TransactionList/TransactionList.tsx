import { useEffect, useState } from "react";

import { getCurrentUser } from "../../redux/auth/authOperations";
import { getTransactions, deleteTransaction } from "../../redux/transactions/transactionsOperations";

import { selectTransactions } from "../../redux/transactions/transactionsSelectors";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import type { TransactionListProps } from "./Transaction.types";

import { ConfirmModal } from "../ConfirmModal/ConfirmModal";

import { RiDeleteBinLine } from "react-icons/ri";
import styles from "./TransactionList.module.scss";

export const TransactionList = ({ type }: TransactionListProps) => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

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
    <>
      <ul className={styles.transactions}>
        <li className={styles.head}>
          <span className={styles.head__date}>Дата</span>
          <span className={styles.head__desc}>Опис</span>
          <span className={styles.head__category}>Категорія</span>
          <span className={styles.head__amount}>Сума</span>
        </li>

        {filteredTransactions.length === 0 ? (
          <li className={styles.transactions__item}>Транзакцій поки немає</li>
        ) : (
          filteredTransactions.map((transaction) => (
            <li className={styles.transactions__item} key={transaction._id}>
              <div className={styles.transactions__wrap}>
                <div className={styles.transactions__subwrap}>
                  <div className={styles.transactions__date}>{new Date(transaction.date).toLocaleDateString()}</div>
                  <div className={styles.transactions__desc}>{transaction.description}</div>
                </div>
                <div className={styles.transactions__category}>{transaction.category}</div>
              </div>

              <div className={styles.transactions__wrapper}>
                <div className={transaction.type === "income" ? styles.income : styles.expense}>
                  {transaction.type === "income" ? "" : "-"} {transaction.amount} UAH
                </div>

                <button className={styles.transactions__btn} onClick={() => setTransactionToDelete(transaction._id)}>
                  <RiDeleteBinLine />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <ConfirmModal
        isOpen={!!transactionToDelete}
        title="Ви впевнені?"
        onClose={() => setTransactionToDelete(null)}
        onConfirm={() => {
          if (transactionToDelete) {
            handleDelete(transactionToDelete);
            setTransactionToDelete(null);
          }
        }}
      />
    </>
  );
};
