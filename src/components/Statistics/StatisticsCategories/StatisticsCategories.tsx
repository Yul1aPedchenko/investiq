import { useMemo, useState } from "react";

import { expenseCategories, incomeCategories } from "../../TransactionForm/categories";

import { categoriesIcons } from "./categories";

import type { Props, CategoriesMap } from "./StatisticsCategories.types";

import { StatisticsChart } from "../StatisticsChart/StatisticsChart";

import styles from "./StatisticsCategories.module.scss";

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
  const chartData = useMemo(() => {
    if (!selectedCategory) return [];

    const grouped: Record<string, number> = {};

    transactions
      .filter((t) => t.type === type && t.category === selectedCategory)
      .forEach((t) => {
        grouped[t.description] = (grouped[t.description] || 0) + t.amount;
      });

    return Object.entries(grouped)
      .map(([name, amount]) => ({
        name,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, selectedCategory, type]);

  return (
    <div className={styles.mainwrap}>
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
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                disabled={disabled}
                onClick={() => setSelectedCategory(category)}
                className={`
        ${styles.categories__item}
        ${isActive ? styles.categories__active : ""}`}
              >
                <p className={styles.categories__amount}>{amount.toFixed(2)}</p>
                <img src={categoriesIcons[category][isActive ? "active" : "default"]} alt={category} />
                <p className={styles.categories__title}>{category}</p>
                <div className={styles.categories__bg}></div>
              </button>
            );
          })}
        </div>
      </div>
      <div className={styles.wrap}>
        <StatisticsChart data={chartData} category={selectedCategory} />
      </div>
    </div>
  );
};
