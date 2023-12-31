import { useMemo, useState } from "react";
import styles from "./picker.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SearchPlatform, Status } from "@prisma/client";
import { ActionsModal } from "../ActionsModal/ActionsModal";

type ArrayElement = { id: string; [key: string]: string };

type PickerProps = {
  data: ArrayElement[];
  onSelect: (el: string) => void;
  selectedItem: string;
  expandIcon?: React.ReactElement;
  placeholder: string;
  searchInput?: boolean;
  searchProperty: string;
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
    return data.filter((el) => el[searchProperty]?.includes(searchValue));
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

      <ActionsModal
        isModalOpened={showModal}
        close={() => setShowModal(false)}
        title={placeholder.replace("*", "")}
      >
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
                onClick={() => handleClick(el[searchProperty]!)}
              >
                {el[searchProperty]}
              </li>
            );
          })}
        </ul>
      </ActionsModal>
    </>
  );
};
