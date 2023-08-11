import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated" && router.pathname !== "/") {
    async () => {
      try {
        await router.push("/");
      } catch (e) {
        console.error(e);
      }
    };
  }

  if (session.status === "authenticated" && router.pathname === "/") {
    async () => {
      try {
        await router.push("/");
      } catch (e) {
        console.error(e);
      }
    };
  }

  return children;
};
