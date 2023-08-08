import { useState } from "react";
import styles from "./nav.module.css";
import Link from "next/link";

export const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleClick = () => setIsMenuOpened((prev) => !prev);

  return (
    <div className={styles.navbar}>
      <Link href={"/dashboard"} className={styles.logo}>
        AIT
      </Link>
      <div className={styles.navBtns}>
        <Link className={styles.openFormBtn} href={"/new-application"}>
          Add application
        </Link>
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
