import styles from "./ConfirmModal.module.scss";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmModal = ({ isOpen, title, confirmText = "Так", cancelText = "Ні", onConfirm, onClose }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>


        <div className={styles.buttons}>
          <button className={styles.confirm} onClick={onConfirm}>
            {confirmText}
          </button>

          <button className={styles.cancel} onClick={onClose}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
