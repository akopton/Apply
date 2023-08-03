import { AuthBtn } from "@/components/AuthBtn/AuthBtn";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function DashboardPage() {
  const { data: sessionData } = useSession();

  if (!sessionData?.user) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="flex h-screen max-h-screen flex-col items-center justify-center gap-10 bg-primaryBg p-10">
        <span>welcome to dashboard</span>
        <AuthBtn signOut />
      </main>
    </>
  );
}
