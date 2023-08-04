import { MdAdd } from "react-icons/md";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { useContext, useState } from "react";
import { ApplicationFormContext } from "@/context/FormContext";
import styles from "./nav.module.css";

export const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { openForm } = useContext(ApplicationFormContext);

  const handleClick = () => setIsMenuOpened((prev) => !prev);

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>AIT</div>
      <div className={styles.navBtns}>
        <div className={styles.openFormBtn}>
          <CustomBtn type="button" text="Add application" onClick={openForm} />
        </div>
        <div className={styles.hamburger} onClick={handleClick}>
          <div
            className={styles.piece}
            style={{
              transform: isMenuOpened
                ? "translateY(-50%) rotate(45deg)"
                : "translateY(0) rotate(0)",
              top: isMenuOpened ? "50%" : "0",
            }}
          />
          <div
            className={styles.piece}
            style={{ opacity: isMenuOpened ? "0" : "1" }}
          />
          <div
            className={styles.piece}
            style={{
              bottom: isMenuOpened ? "50%" : "0",
              transform: isMenuOpened
                ? "translateY(50%) rotate(-45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
