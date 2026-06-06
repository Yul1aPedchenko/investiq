import styles from "./BalanceHint.module.scss";

export const BalanceHint = () => {
  return (
    <div className={styles.hint}>
      <div className={styles.hint__arrow}></div>
      <h3 className={styles.hint__title}>Привіт! Для початку роботи внесіть свій поточний баланс рахунку!</h3>
      <p className={styles.hint__text}>Ви не можете витрачати гроші, поки їх у Вас немає :)</p>
    </div>
  );
};
