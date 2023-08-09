import { useState } from "react";
import styles from "./nav.module.css";
import Link from "next/link";
import { Hamburger } from "../Hamburger/Hamburger";

export const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleClick = () => setIsMenuOpened((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <Link href={"/dashboard"} className={styles.logo}>
        AIT
      </Link>
      <div className={styles.navBtns}>
        <Link className={styles.openFormBtn} href={"/new-application"}>
          Add application
        </Link>
        <Hamburger isMenuOpened={isMenuOpened} onClick={handleClick} />
      </div>
      <div
        className={styles.menu}
        style={{ height: isMenuOpened ? "100%" : "0" }}
      ></div>
    </nav>
  );
};
