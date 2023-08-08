import { useSession } from "next-auth/react";
import { ApplicationForm } from "../ApplicationForm/ApplicationForm";
import { useContext } from "react";
import { ApplicationFormContext } from "@/context/FormContext";
import { Navbar } from "../Navbar/Navbar";
import styles from "./layout.module.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isFormOpened } = useContext(ApplicationFormContext);
  const session = useSession();

  if (!session.data?.user) return children;

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.content}>{children}</div>
      <div
        className={styles.formWrapper}
        style={
          isFormOpened
            ? { height: "100%", width: "100%", transition: ".3s ease" }
            : { height: "0", width: "0", transition: ".3s ease" }
        }
      >
        {isFormOpened && <ApplicationForm />}
      </div>
    </div>
  );
};
