import { signIn } from "next-auth/react";
import styles from "./btn.module.css";

type BtnProps = {
  provider: string;
};

export const AuthBtn = (props: BtnProps) => {
  const handleClick = async () => await signIn(props.provider);

  return (
    <button type="button" onClick={handleClick} className={styles.btn}>
      <span className={styles.btnText}>Sign In</span>
    </button>
  );
};
