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
      <main className="relative h-full">
        <div className="h-[90%] w-full">
          <CustomList data={filteredData} />
        </div>
        <div className="sticky bottom-0 flex w-full items-center justify-center bg-primaryBg p-2">
          <Filter />
        </div>
      </main>
    </>
  );
}
