import { useEffect, useState } from "react";
import styles from "./modal.module.css";

type ModalProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export const LoadingStatusModal = (props: ModalProps) => {
  const { isLoading, isSuccess, isError } = props;
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setShowComponent(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (!showComponent) {
    return null;
  }

  return (
    <div
      className={styles.modal}
      style={{
        bottom: isLoading ? "0" : isError ? "0" : isSuccess ? "0" : "-100%",
      }}
    >
      {isLoading
        ? "Loading..."
        : isError
        ? "Error"
        : isSuccess
        ? "Success"
        : ""}
    </div>
  );
};
