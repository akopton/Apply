import { useState, useContext } from "react";
import styles from "./filter.module.css";
import { ApplicationsContext } from "@/context/ApplicationsContext";

export const Filter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { search } = useContext(ApplicationsContext);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    search(value);
  };

  return (
    <>
      <div className={styles.buttonsWrapper}>
        <button
          type="button"
          className={styles.filterBtn}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters
        </button>
        <input
          type="text"
          placeholder="Position or company..."
          className={styles.filterBtn}
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
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
