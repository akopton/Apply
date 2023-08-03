import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./btn.module.css";
import { useRouter } from "next/router";

type BtnProps = {
  provider?: string;
  signOut?: boolean;
};

export const AuthBtn = (props: BtnProps) => {
  const login = async () => {
    try {
      await signIn(props.provider, {
        callbackUrl: "/dashboard",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button
      type="button"
      onClick={props.signOut ? () => void logout() : () => void login()}
      className={styles.btn}
    >
      <span className={styles.btnText}>
        {!props.signOut ? "Sign In" : "Sign Out"}
      </span>
    </button>
  );
};
