import { useMemo, useState } from "react";

import { expenseCategories,  incomeCategories } from "../../TransactionForm/categories";
import { categoriesIcons } from "./categories";

import type { Props, CategoriesMap } from "./StatisticsCategories.types";

export const StatisticsCategories = ({ transactions }: Props) => {
  const [type, setType] = useState<"expense" | "income">("expense");

  const categories = useMemo(() => {
    const result: CategoriesMap = {};

    const allCategories = type === "expense" ? expenseCategories : incomeCategories;

    allCategories.forEach((category) => {
      result[category] = 0;
    });

    transactions
      .filter((t) => t.type === type)
      .forEach((t) => {
        result[t.category] += t.amount;
      });

    return result;
  }, [transactions, type]);

  return (
    <div>
      <div>
        <button onClick={() => setType("expense")} disabled={type === "expense"}>
          Витрати
        </button>

        <button onClick={() => setType("income")} disabled={type === "income"}>
          Дохід
        </button>
      </div>

      <div>
        {Object.entries(categories).map(([category, amount]) => (
          <div key={category}>
            <p>{amount.toFixed(2)}</p>

            
            <img src={categoriesIcons[category]} alt="." />

            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
