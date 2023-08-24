import { ApplicationsList } from "@/components/ApplicationsList/ApplicationsList";
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
      <main>
        <ApplicationsList data={filteredData} />
        <Filter />
      </main>
    </>
  );
}
