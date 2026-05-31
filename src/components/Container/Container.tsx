import type { ContainerProps } from "./Container.types";
import styles from "./Container.module.scss";

export const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
