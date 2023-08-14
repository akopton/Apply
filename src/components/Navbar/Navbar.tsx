import { useState } from "react";
import styles from "./nav.module.css";
import Link from "next/link";
import { Hamburger } from "../Hamburger/Hamburger";
import { AuthBtn } from "../AuthBtn/AuthBtn";

export const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const handleClick = () => {
    setIsMenuOpened((prev) => !prev);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = overflow === "hidden" ? "auto" : "hidden";
  };

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/applications", label: "Your applications" },
  ];

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
        style={{
          height: isMenuOpened ? "100vh" : "0",
          position: "fixed",
          top: "0",
          left: "0",
        }}
      >
        <ul className={styles.menuLinks}>
          {links.map((link, idx) => {
            return (
              <li key={idx} className={styles.link}>
                <Link href={link.href} onClick={handleClick}>
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className={styles.signOutBtn}>
            <AuthBtn signOut />
          </li>
        </ul>
      </div>
    </nav>
  );
};
