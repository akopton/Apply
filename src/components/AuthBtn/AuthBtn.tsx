import { signIn, signOut } from "next-auth/react";
import styles from "./btn.module.css";

type BtnProps = {
  provider?: string;
  signOut?: boolean;
};

export const AuthBtn = (props: BtnProps) => {
  const handleClick = async () => {
    !props.signOut ? await signIn(props.provider) : await signOut();
  };

  return (
    <button type="button" onClick={handleClick} className={styles.btn}>
      <span className={styles.btnText}>
        {!props.signOut ? "Sign In" : "Sign Out"}
      </span>
    </button>
  );
};
