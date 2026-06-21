import { useNavigate } from "react-router-dom";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";

import { Balance } from "../../Dashboard/Balance/Balance";

import type { Props } from "./StatisticsTop.types";

import styles from "./StatisticsTop.module.scss";

export const StatisticsTop = ({ transactions, selectedDate, prevMonth, nextMonth, disablePrev, disableNext }: Props) => {
  const navigate = useNavigate();

  const expense = transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);

  const formattedDate = selectedDate
    .toLocaleString("uk-UA", {
      month: "long",
      year: "numeric",
    })
    .replace(" р.", "")
    .toUpperCase();

  return (
    <div className={styles.top}>
      <div className={styles.top__wrap}>
        <button onClick={() => navigate("/dashboard")} className={styles.top__btn}>
          <IoIosArrowRoundBack /> Повернутись на головну
        </button>
        <button onClick={() => navigate("/dashboard")} className={styles.top__btnMob}>
          <IoIosArrowRoundBack />
        </button>
        <Balance showBtn={false}/>
        <div className={styles.top__curPeriod}>
          <p className={styles.top__subtitle}>Поточний період</p>
          <div className={styles.top__sliderWrap}>
            <button onClick={prevMonth} className={styles.top__sliderBtn} disabled={disablePrev}>
              <IoChevronBack />
            </button>
            <span className={styles.top__date}>
              {formattedDate}
            </span>
            <button onClick={nextMonth} className={styles.top__sliderBtn} disabled={disableNext}>
              <IoChevronForward />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.top__wrapper}>
        <p className={styles.top__expense}>
          Витрати: <span>- {expense.toFixed(2)} грн.</span>
        </p>
        <div className={styles.top__line}></div>
        <p className={styles.top__income}>
          Доходи: <span>+ {income.toFixed(2)} грн.</span>
        </p>
      </div>
    </div>
  );
};
