import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth/authSlice";

import { selectUser, selectToken } from "../../redux/auth/authSelectors";
import logo from "../../assets/logo.svg";
import { RxExit } from "react-icons/rx";

import styles from "./Header.module.scss";

export const Header = () => {
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const firstLetter = user?.name?.charAt(0).toUpperCase() ?? "";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="logo" />
      {token && user && (
        <div className={styles.header__user}>
          <div className={styles.header__avatar}>{firstLetter}</div>
          <span className={styles.header__username}>{user.name}</span>

          <button className={styles.header__btn} onClick={handleLogout}>
            <RxExit className={styles.header__icon} />
          </button>
        </div>
      )}
    </header>
  );
};
