import { CustomList } from "@/components/CustomList/CustomList";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function DashboardPage() {
  const { data: sessionData } = useSession();
  const applications = api.application.getTop.useQuery(4);

  if (!sessionData?.user) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="flex flex-col items-center gap-10 bg-primaryBg py-5">
        <div className="flex w-full flex-col gap-3">
          <h2 className="text-center text-2xl">Recently added applications</h2>
          {applications.data && <CustomList data={applications.data} />}
          <Link
            href={"/applications"}
            className="self-center rounded-xl border-2 px-3 py-2"
          >
            Show all applications
          </Link>
        </div>
      </main>
    </>
  );
}
