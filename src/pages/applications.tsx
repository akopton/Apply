import { CustomList } from "@/components/CustomList/CustomList";
import { Filter } from "@/components/Filter/Filter";
import { api } from "@/utils/api";
import Head from "next/head";

export default function ApplicationsPage() {
  const applications = api.application.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Applications</title>
      </Head>
      <main className="flex w-full flex-col items-start">
        <Filter />
        <div className="w-full overflow-y-auto">
          {applications.data && <CustomList data={applications.data} />}
        </div>
      </main>
    </>
  );
}
