import { useState } from "react";
import styles from "./dropdown.module.css";

type DropdownProps = {
  data: any[];
  onSelect: (el: string) => void;
  selectedItem: string;
  expandIcon?: React.ReactElement;
  placeholder: string;
};

const Dropdown = ({
  data,
  selectedItem,
  onSelect,
  expandIcon,
  placeholder,
}: DropdownProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);

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
        style={{ borderColor: showContent ? "var(--secondary-color)" : "" }}
      >
        <button
          type="button"
          onClick={() => setShowContent((prevState) => !prevState)}
          className={styles.dropdownSelectedItem}
          style={{ justifyContent: expandIcon ? "space-between" : "center" }}
        >
          {selectedItem ? selectedItem : placeholder}
          {expandIcon ? (
            <div className={showContent ? "icon --opened" : "icon"}>
              {expandIcon}
            </div>
          ) : null}
        </button>
        {showContent && (
          <ul className={styles.dropdownList}>
            {data.map((el, id) => {
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
