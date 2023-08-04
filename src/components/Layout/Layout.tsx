import { useSession } from "next-auth/react";
import { ApplicationForm } from "../ApplicationForm/ApplicationForm";
import styles from "./layout.module.css";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (!session.data?.user) return children;

  return (
    <div className={styles.layout}>
      {children}
      <ApplicationForm />
    </div>
  );
};
