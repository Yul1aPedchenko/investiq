import { useMemo, useState } from "react";

import { expenseCategories, incomeCategories } from "../../TransactionForm/categories";

import { categoriesIcons } from "./categories";

import type { Props, CategoriesMap } from "./StatisticsCategories.types";

import styles from './StatisticsCategories.module.scss';

export const StatisticsCategories = ({ transactions }: Props) => {
  const [type, setType] = useState<"expense" | "income">("expense");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const result: CategoriesMap = {};

    const allCategories = type === "expense" ? expenseCategories : incomeCategories;

    allCategories.forEach((category) => {
      result[category] = 0;
    });

    transactions
      .filter((t) => t.type === type)
      .forEach((transaction) => {
        result[transaction.category] += transaction.amount;
      });

    return result;
  }, [transactions, type]);

  return (
    <div className={styles.wrap}>
      <div className={styles.switcher}>
        <button type="button" onClick={() => setType("expense")} className={styles.switcher__arrow} disabled={type === "expense"}>
          ❮
        </button>

        <h2 className={styles.switcher__title}>{type === "expense" ? "ВИТРАТИ" : "ДОХІД"}</h2>

        <button type="button" onClick={() => setType("income")} className={styles.switcher__arrow} disabled={type === "income"}>
          ❯
        </button>
      </div>

      <div className={styles.categories}>
        {Object.entries(categories).map(([category, amount]) => {
          const disabled = amount === 0;

          return (
            <button
              key={category}
              disabled={disabled}
              onClick={() => setSelectedCategory(category)}
              className={`
                  ${styles.categories__item}
                  ${selectedCategory === category ? styles.categories__active : ""}
                `}
            >
              <p className={styles.categories__amount}>{amount.toFixed(2)}</p>

              <img src={categoriesIcons[category]} alt={category} />

              <p className={styles.categories__title}>{category}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
