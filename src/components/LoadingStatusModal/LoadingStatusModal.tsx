import { useEffect, useState } from "react";
import styles from "./modal.module.css";

export const LoadingStatusModal = () => {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);

    setTimeout(() => {
      setShowComponent(false);
    }, 1000);
  }, []);

  return (
    <div
      className={styles.modal}
      style={{
        bottom: showComponent ? "0" : "-100%",
      }}
    >
      Success
    </div>
  );
};
