import { useSession } from "next-auth/react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  if (!session.data?.user) return children;

  return <div>{children}</div>;
};
