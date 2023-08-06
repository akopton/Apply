import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./dropdown.module.css";

type DropdownProps = {
  data: any[];
  onSelect: (el: string) => void;
  selectedItem: string;
  expandIcon?: React.ReactElement;
  placeholder: string;
  searchInput?: boolean;
};

const Dropdown = (props: DropdownProps) => {
  const { data, selectedItem, onSelect, expandIcon, placeholder, searchInput } =
    props;
  const [showContent, setShowContent] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const filteredData = useMemo(() => {
    if (searchValue === "") return data;
    return data.filter((el) => el.includes(searchValue));
  }, [searchValue, data]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget.value;
    setSearchValue(el);
    onSelect(el);
  };

  const Item = ({ el }: { el: string }) => {
    return (
      <li>
        <button
          type="button"
          onClick={() => {
            onSelect(el);
            setShowContent(false);
          }}
          className={
            selectedItem === el
              ? `${styles.item as string} ${styles.selected as string}}`
              : `${styles.item as string}`
          }
        >
          {el}
        </button>
      </li>
    );
  };

  return (
    <div className={styles.dropdownWrapper}>
      <div
        className={styles.dropdown}
        style={showContent ? { borderColor: "var(--secondary-color)" } : {}}
      >
        {!searchInput ? (
          <button
            type="button"
            onClick={() => setShowContent((prevState) => !prevState)}
            className={styles.dropdownSelectedItem}
            style={{ justifyContent: expandIcon ? "space-between" : "center" }}
          >
            {selectedItem ? selectedItem : placeholder}
            {expandIcon ? (
              <div
                className={
                  showContent
                    ? `${styles.icon as string} ${styles.opened as string}`
                    : `${styles.icon as string}`
                }
              ></div>
            ) : null}
          </button>
        ) : (
          <div
            className={styles.dropdownSelectedItem}
            style={{ justifyContent: expandIcon ? "space-between" : "center" }}
          >
            <input
              type="text"
              onFocus={() => setShowContent(true)}
              value={selectedItem ? selectedItem : searchValue}
              onChange={handleChange}
              placeholder={placeholder}
            />
          </div>
        )}
        {showContent && (
          <ul className={styles.dropdownList}>
            {filteredData.map((el, id) => {
              return typeof el === "object" ? (
                <Item el={el.name} key={id} />
              ) : (
                <Item el={el} key={id} />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
