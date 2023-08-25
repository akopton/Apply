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
      <button
        className={styles.listHeader}
        type="button"
        onClick={() => setShowContent((prev) => !prev)}
      >
        <span style={{ fontSize: "20px" }}>{headerText}</span>{" "}
        <span
          style={{
            rotate: showContent ? "180deg" : "0deg",
            transition: ".3s ease",
            fontSize: "24px",
          }}
        >
          {headerIcon && headerIcon}
        </span>
      </button>
      {showContent && <ul className={styles.list}>{children}</ul>}
    </div>
  );
};
