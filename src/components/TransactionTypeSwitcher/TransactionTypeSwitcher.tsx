import styles from "./TransactionTypeSwitcher.module.scss";

type Props = {
  transactionType: "expense" | "income";
  setTransactionType: React.Dispatch<React.SetStateAction<"expense" | "income">>;
};

export const TransactionTypeSwitcher = ({ transactionType, setTransactionType }: Props) => {
  return (
    <div className={styles.switcher}>
      <button type="button" className={transactionType === "expense" ? styles.switcher__active : styles.switcher__button} onClick={() => setTransactionType("expense")}>
        ВИТРАТИ
      </button>

      <button type="button" className={transactionType === "income" ? styles.switcher__active : styles.switcher__button} onClick={() => setTransactionType("income")}>
        ДОХІД
      </button>
    </div>
  );
};
