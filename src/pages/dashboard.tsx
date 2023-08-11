import { CustomBarChart } from "@/components/CustomBarChart/CustomBarChart";
import { CustomList } from "@/components/CustomList/CustomList";
import { api } from "@/utils/api";
// import { useChartData } from "@/utils/useChartData";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function DashboardPage() {
  const { data: sessionData } = useSession();
  const applications = api.application.getTop.useQuery(4);

  // const { data: applicationsCountForStatus } =
  //   api.status.getApplicationsForSingleStatus.useQuery();

  // const { data: applicationsCountForPlatform } =
  //   api.searchPlatform.getApplicationsForSinglePlatform.useQuery();

  // const { chartData: chartDataStatus, maxValue: maxValueStatus } = useChartData(
  //   applicationsCountForStatus,
  //   "name",
  //   "_count.applications"
  // );

  // const { chartData: chartDataPlatforms, maxValue: maxValuePlatforms } =
  //   useChartData(applicationsCountForPlatform, "url", "_count.applications");

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
        {/* <div className="flex flex-col items-center gap-4">
          <span>Applications based on status:</span>
          <CustomBarChart data={chartDataStatus} maxValue={maxValueStatus!} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <span>Applications based on searching platform:</span>
          <CustomBarChart
            data={chartDataPlatforms}
            maxValue={maxValuePlatforms!}
          />
        </div> */}
      </main>
    </>
  );
}
