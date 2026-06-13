import { useMemo } from "react";

import { selectTransactions } from "../../redux/transactions/transactionsSelectors";
import { useAppSelector } from "../../redux/hooks";

import { monthNames } from "./month";

export const Summary = () => {
  const transactions = useAppSelector(selectTransactions);

  const summary = useMemo(() => {
    const result: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);

      const month = monthNames[date.getMonth()];

      if (!result[month]) {
        result[month] = 0;
      }

      result[month] += transaction.type === "income" ? transaction.amount : -transaction.amount;
    });
    return Object.entries(result).reverse();
  }, [transactions]);

  return (
    <div>
      <h3>зведення</h3>
      <ul>
        {summary.map(([month, amount]) => (
          <li key={month}>
            <span>{month}</span>

            <span>
              {amount > 0 ? "+" : ""}

              {amount.toLocaleString("uk-UA", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
