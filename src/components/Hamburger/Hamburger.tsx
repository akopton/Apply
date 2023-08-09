import styles from "./hamburger.module.css";

type HamburgerProps = {
  isMenuOpened: boolean;
  onClick: () => void;
};

export const Hamburger = (props: HamburgerProps) => {
  const { isMenuOpened, onClick } = props;
  return (
    <div className={styles.hamburger} onClick={onClick}>
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
  );
};
