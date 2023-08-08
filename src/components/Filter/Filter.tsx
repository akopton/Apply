import { useState, useContext } from "react";
import styles from "./filter.module.css";
import { ApplicationsContext } from "@/context/ApplicationsContext";
import { api } from "@/utils/api";

export const Filter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const platformList = api.searchPlatform.getAll.useQuery();
  const statusList = api.status.getAll.useQuery();
  const daysFiltersList = ["30", "14", "7"];

  const {
    searchByValue,
    applyFilters,
    filters: activeFilters,
  } = useContext(ApplicationsContext);

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    searchByValue(value);
  };

  const handleFilters = (type: string, value: string) => {
    switch (type) {
      case "days":
        if (activeFilters?.days === "") {
          applyFilters({ ...activeFilters, days: value });
        } else {
          if (activeFilters?.days !== value) {
            applyFilters({ ...activeFilters, days: value });
          } else {
            applyFilters({ ...activeFilters, days: "" });
          }
        }
        break;
      case "status":
        if (activeFilters?.statusId === "") {
          applyFilters({ ...activeFilters, statusId: value });
        } else {
          if (activeFilters?.statusId !== value) {
            applyFilters({ ...activeFilters, statusId: value });
          } else {
            applyFilters({ ...activeFilters, statusId: "" });
          }
        }
        break;
      case "platform":
        if (activeFilters?.platformId === "") {
          applyFilters({ ...activeFilters, platformId: value });
        } else {
          if (activeFilters?.platformId !== value) {
            applyFilters({ ...activeFilters, platformId: value });
          } else {
            applyFilters({ ...activeFilters, platformId: "" });
          }
        }
        break;
    }
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
        <div className={styles.filtersSet}>
          <span className={styles.filtersSetTitle}>Added X days ago:</span>
          <div className={styles.filtersSetBtns}>
            {daysFiltersList.map((el, idx) => {
              return (
                <button
                  key={idx}
                  type="button"
                  className={styles.filterBtn}
                  onClick={() => handleFilters("days", el)}
                  style={{
                    borderColor:
                      activeFilters?.days === el
                        ? "var(--secondary-color)"
                        : "var(--primary-color)",
                  }}
                >
                  {`> ${el}`}
                </button>
              );
            })}
          </div>
        </div>
        <div className={styles.filtersSet}>
          <span className={styles.filtersSetTitle}>Status:</span>
          <div className={styles.filtersSetBtns}>
            {statusList.data &&
              statusList.data.map((el) => {
                return (
                  <button
                    key={el.id}
                    type="button"
                    className={styles.filterBtn}
                    onClick={() => handleFilters("status", el.id)}
                    style={{
                      borderColor:
                        activeFilters?.statusId !== "" &&
                        activeFilters?.statusId === el.id
                          ? "var(--secondary-color)"
                          : "var(--primary-color)",
                    }}
                  >
                    {el.name}
                  </button>
                );
              })}
          </div>
        </div>
        <div className={styles.filtersSet}>
          <span className={styles.filtersSetTitle}>Search platform:</span>
          <div className={styles.filtersSetBtns}>
            {platformList.data &&
              platformList.data.map((el) => {
                return (
                  <button
                    key={el.id}
                    type="button"
                    className={styles.filterBtn}
                    onClick={() => handleFilters("platform", el.id)}
                    style={{
                      borderColor:
                        activeFilters?.platformId !== "" &&
                        activeFilters?.platformId === el.id
                          ? "var(--secondary-color)"
                          : "var(--primary-color)",
                    }}
                  >
                    {el.url}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
      {showFilters && (
        <div className={styles.blur} onClick={() => setShowFilters(false)} />
      )}
    </>
  );
};
