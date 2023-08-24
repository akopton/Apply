import { useState } from "react";
import styles from "./list.module.css";

type ListProps = {
  children: React.ReactNode;
  headerText: string;
  headerIcon?: React.ReactNode;
};

export const ExpandableList = ({
  children,
  headerText,
  headerIcon,
}: ListProps) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className={styles.listWrapper}>
      <h2 className={styles.listHeader}>
        <button type="button" onClick={() => setShowContent((prev) => !prev)}>
          {headerText} {headerIcon && headerIcon}
        </button>
      </h2>
      {showContent && <ul className={styles.list}>{children}</ul>}
    </div>
  );
};
