import { StatusList } from "@/components/FilledBarsList/FilledBarsList";
import { CustomList } from "@/components/CustomList/CustomList";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function DashboardPage() {
  const { data: sessionData } = useSession();
  const applications = api.application.getTop.useQuery(4);
  const { data: allApplicationsCount } =
    api.application.getAllApplicationsCountForUser.useQuery();

  const { data: applicationsForStatus } =
    api.status.getApplicationsForSingleStatus.useQuery();

  const { data: applicationsForPlatform } =
    api.searchPlatform.getApplicationsForSinglePlatform.useQuery();

  const mappedApplicationsForStatus = applicationsForStatus
    ?.map((el) => {
      const label = el.name;
      const value = el._count.applications;
      return {
        label,
        value,
      };
    })
    .filter((el) => el.value > 0);

  const mappedApplicationsForPlatform = applicationsForPlatform
    ?.map((el) => {
      const label = el.url;
      const value = el._count.applications;
      return {
        label,
        value,
      };
    })
    .filter((el) => el.value > 0);

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
        <div className="flex flex-col items-center gap-3">
          <span className="text-center text-2xl">
            Currently you are applying for
          </span>
          <span className="border-b-2 border-b-primaryColor px-2 text-center text-3xl">
            <Link href={"/applications"}>{allApplicationsCount}</Link>
          </span>
          <span className="text-center text-2xl">offers.</span>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-center text-2xl">
            Your current applications based on status:
          </span>
          {applicationsForStatus && (
            <StatusList
              data={mappedApplicationsForStatus}
              maxValue={allApplicationsCount}
            />
          )}
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-center text-2xl">
            Most popular search platforms:
          </span>
          {applicationsForPlatform && (
            <StatusList
              data={mappedApplicationsForPlatform}
              maxValue={allApplicationsCount}
            />
          )}
        </div>
      </main>
    </>
  );
}
