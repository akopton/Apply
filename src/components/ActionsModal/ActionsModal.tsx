import styles from "./modal.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

type ModalProps = {
  close: () => void;
  isModalOpened: boolean;
  children: React.ReactNode;
  title?: string;
};

export const ActionsModal = (props: ModalProps) => {
  const { close, isModalOpened, children, title } = props;

  return (
    <>
      <div
        className={styles.modal}
        style={{ bottom: isModalOpened ? "0" : "-100%" }}
      >
        {title && (
          <div className={styles.modalTop}>
            <span className={styles.modalTitle}>{title && title}</span>
          </div>
        )}

        <div className={styles.modalCloseAbsolute} onClick={close}>
          <AiOutlineCloseCircle />
        </div>

        {children}
      </div>

      {isModalOpened && <div className={styles.blur} onClick={close}></div>}
    </>
  );
};
