import { CustomList } from "@/components/CustomList/CustomList";
import { useContext } from "react";
import { Filter } from "@/components/Filter/Filter";
import { ApplicationsContext } from "@/context/ApplicationsContext";
import Head from "next/head";

export default function ApplicationsPage() {
  const { filteredData } = useContext(ApplicationsContext);

  return (
    <>
      <Head>
        <title>Applications</title>
      </Head>
      <main className="relative flex h-full flex-col items-start overflow-hidden">
        <div className="h-full w-full overflow-scroll px-10 py-2">
          <CustomList data={filteredData} />
        </div>
        <div className="flex w-full items-center justify-center bg-primaryBg p-2">
          <Filter />
        </div>
      </main>
    </>
  );
}
