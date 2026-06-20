import { useNavigate } from "react-router-dom";

import { IoIosArrowRoundBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";

import { Balance } from "../../Dashboard/Balance/Balance";

import type { Props } from "./StatisticsTop.types";

import styles from "./StatisticsTop.module.scss";

export const StatisticsTop = ({ transactions, selectedDate, setSelectedDate }: Props) => {
  const navigate = useNavigate();

  const expense = transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };
  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };
  return (
    <div className={styles.top}>
      <div className={styles.top__wrap}>
        <button onClick={() => navigate("/dashboard")} className={styles.top__btn}>
          <IoIosArrowRoundBack /> Повернутись на головну
        </button>
        <button onClick={() => navigate("/dashboard")} className={styles.top__btnMob}>
          <IoIosArrowRoundBack /> 
        </button>
        <Balance />
        <div>
          <p>Поточний період</p>
          <div>
            <button onClick={prevMonth}>
              <IoChevronBack />
            </button>
            <span>
              {selectedDate.toLocaleString("uk-UA", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={nextMonth}>
              <IoChevronForward />
            </button>
          </div>
        </div>
      </div>

      <div>
        <p>Витрати: - {expense} грн.</p>
        <p>Доходи: + {income} грн.</p>
      </div>
    </div>
  );
};
