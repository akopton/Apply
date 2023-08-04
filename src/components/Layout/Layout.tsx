import { useSession } from "next-auth/react";
import { ApplicationForm } from "../ApplicationForm/ApplicationForm";
import styles from "./layout.module.css";
import { useState } from "react";
import { CustomBtn } from "../CustomBtn/CustomBtn";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const session = useSession();

  const openForm = () => {
    setIsFormOpened(true);
  };

  if (!session.data?.user) return children;

  return (
    <div className={styles.layout}>
      <CustomBtn type="button" text="Open form" onClick={openForm} />
      {children}
      <div
        className={styles.formWrapper}
        style={
          isFormOpened
            ? { height: "100%", width: "100%", transition: ".3s ease" }
            : { height: "0", width: "0", transition: ".3s ease" }
        }
      >
        <ApplicationForm />
      </div>
    </div>
  );
};
