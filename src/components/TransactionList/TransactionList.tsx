import { useEffect } from "react";

import { getTransactions, deleteTransaction } from "../../redux/transactions/transactionsOperations";

import { selectTransactions } from "../../redux/transactions/transactionsSelectors";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export const TransactionList = () => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(selectTransactions);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTransaction(id)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction._id}>
          <div>{new Date(transaction.date).toLocaleDateString()}</div>
          <div>{transaction.description}</div>
          <div>{transaction.category}</div>
          <div>
            {transaction.type === "income" ? "" : "-"} {transaction.amount} UAH
          </div>

          <button onClick={() => handleDelete(transaction._id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};
