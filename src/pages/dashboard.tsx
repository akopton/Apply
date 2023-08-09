import { AuthBtn } from "@/components/AuthBtn/AuthBtn";
import { CustomBarChart } from "@/components/CustomBarChart/CustomBarChart";
import { CustomList } from "@/components/CustomList/CustomList";
import { CustomPieChart } from "@/components/CustomPieChart/CustomPieChart";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function DashboardPage() {
  const { data: sessionData } = useSession();
  const applications = api.application.getTop.useQuery(4);

  const { data: applicationsCountForStatus } =
    api.status.getApplicationsForSingleStatus.useQuery();

  const { data: applicationsCountForPlatform } =
    api.searchPlatform.getApplicationsForSinglePlatform.useQuery();

  const chartDataPlatforms = applicationsCountForPlatform
    ?.map((el) => {
      return {
        label: el.url,
        value: el._count.applications,
      };
    })
    .filter((el) => el.value > 0);

  const chartData = applicationsCountForStatus
    ?.map((el) => {
      return {
        label: el.name,
        value: el._count.applications,
      };
    })
    .filter((el) => el.value > 0);

  const allApplicationsCountPlatform = applicationsCountForPlatform?.reduce(
    (acc, curr) => {
      return acc + curr._count.applications;
    },
    0
  );

  const allApplicationsCountStatus = chartData?.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);

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
        <div className="flex flex-col items-center gap-4">
          <span>Applications based on status:</span>
          <CustomBarChart
            data={chartData}
            maxValue={allApplicationsCountStatus!}
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span>Applications based on searching platform:</span>
          <CustomBarChart
            data={chartDataPlatforms}
            maxValue={allApplicationsCountPlatform!}
          />
        </div>
      </main>
    </>
  );
}
