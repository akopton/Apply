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
        <Filter />
        <CustomList data={filteredData} />
      </main>
    </>
  );
}
