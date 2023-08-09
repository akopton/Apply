import { useSession } from "next-auth/react";
import { Navbar } from "../Navbar/Navbar";
import styles from "./layout.module.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (!session.data?.user) return children;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
