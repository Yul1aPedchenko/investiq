import { ThreeDots } from "react-loader-spinner";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.overlay}>
      <ThreeDots height="80" width="80" color="#FF751D" visible={true} />
    </div>
  );
};
