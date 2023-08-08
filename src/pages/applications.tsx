import { CustomList } from "@/components/CustomList/CustomList";
import { useContext } from "react";
import { Filter } from "@/components/Filter/Filter";
import { ApplicationsContext } from "@/context/ApplicationsContext";
import { api } from "@/utils/api";
import Head from "next/head";

export default function ApplicationsPage() {
  const applications = api.application.getAll.useQuery();
  const { filteredData } = useContext(ApplicationsContext);

  return (
    <>
      <Head>
        <title>Applications</title>
      </Head>
      <main className="relative flex flex-col items-start">
        <div className="w-full px-10 py-2">
          <CustomList data={filteredData} />
        </div>
        <div className="sticky bottom-0 flex w-full items-center justify-center bg-primaryBg p-2">
          <Filter />
        </div>
      </main>
    </>
  );
}
