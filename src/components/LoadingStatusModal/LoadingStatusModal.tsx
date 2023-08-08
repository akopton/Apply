import { useState } from "react";
import styles from "./modal.module.css";

type ModalProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export const LoadingStatusModal = (props: ModalProps) => {
  const [hideModal, setHideModal] = useState(false);
  const { isLoading, isSuccess, isError } = props;

  if (isSuccess) {
    setTimeout(() => setHideModal(true), 2000);
  }

  return (
    <div
      className={styles.modal}
      style={{
        bottom: isLoading ? "0" : isError ? "0" : isSuccess ? "0" : "-100%",
      }}
    >
      {isLoading ? "Loading" : isError ? "Error" : isSuccess ? "Success" : ""}
    </div>
  );
};
