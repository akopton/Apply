import { useState } from "react";
import styles from "./filter.module.css";

export const Filter = () => {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <>
      <button
        type="button"
        className={styles.filterBtn}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        Filters
      </button>
      <div
        className={styles.filtersModal}
        style={{ bottom: showFilters ? "0" : "-100%" }}
      >
        filters modal
      </div>
      {showFilters && (
        <div className={styles.blur} onClick={() => setShowFilters(false)} />
      )}
    </>
  );
};
