import { useAppSelector } from "../../redux/hooks";
import { selectUser, selectToken } from "../../redux/auth/authSelectors";
import logo from "../../assets/logo.svg";
import { RxExit } from "react-icons/rx";

import styles from "./Header.module.scss";
export const Header = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  const firstLetter = user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="logo" />
      {token && user && (
        <div className={styles.header__user}>
          <div className={styles.header__avatar}>{firstLetter}</div>
          <span className={styles.header__username}>{user.name}</span>

          <button className={styles.header__btn}>
            <RxExit className={styles.header__icon} />
          </button>
        </div>
      )}
    </header>
  );
};
