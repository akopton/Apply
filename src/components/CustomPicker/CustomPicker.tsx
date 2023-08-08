import { useMemo, useState } from "react";
import styles from "./picker.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

type PickerProps = {
  data: any[];
  onSelect: (el: string) => void;
  selectedItem: string;
  expandIcon?: React.ReactElement;
  placeholder: string;
  searchInput?: boolean;
  searchProperty?: string;
  additionalStyles?: React.CSSProperties;
};

export const CustomPicker = (props: PickerProps) => {
  const {
    data,
    selectedItem,
    onSelect,
    expandIcon,
    placeholder,
    searchInput,
    searchProperty,
    additionalStyles,
  } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredData = useMemo(() => {
    if (searchValue === "") return data;
    if (searchProperty) {
      return data.filter((el) => el[searchProperty].includes(searchValue));
    } else {
      return data.filter((el) => el.includes(searchValue));
    }
  }, [searchValue, data]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget.value;
    setSearchValue(el);
    onSelect(el);
  };

  const handleClick = (el: string) => {
    onSelect(el);
    setShowModal(false);
  };

  return (
    <>
      <div
        className={styles.picker}
        onClick={() => setShowModal((prev) => !prev)}
        style={
          showModal
            ? { borderColor: "var(--secondary-color)" }
            : additionalStyles
            ? additionalStyles
            : {}
        }
      >
        {selectedItem ? selectedItem : placeholder}
      </div>
      <div
        className={styles.modal}
        style={{ bottom: showModal ? "0" : "-100%" }}
      >
        <div className={styles.modalTop}>
          <span className={styles.modalTitle}>{placeholder}</span>
          <div
            className={styles.modalClose}
            onClick={() => setShowModal(false)}
          >
            <AiOutlineCloseCircle />
          </div>
        </div>
        {searchInput && (
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Find your platform..."
              value={searchValue}
              onChange={handleChange}
            />
          </div>
        )}
        <ul className={styles.modalContent}>
          {filteredData.map((el) => {
            return (
              <li
                key={el.id}
                className={styles.listItem}
                onClick={() =>
                  handleClick(searchProperty ? el[searchProperty] : el.name)
                }
              >
                {searchProperty ? el[searchProperty] : el.name}
              </li>
            );
          })}
        </ul>
      </div>
      {showModal && (
        <div className={styles.blur} onClick={() => setShowModal(false)}></div>
      )}
    </>
  );
};
