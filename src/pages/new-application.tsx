import { ApplicationForm } from "@/components/ApplicationForm/ApplicationForm";
import Head from "next/head";

export default function NewApplicationPage() {
  return (
    <>
      <Head>
        <title>New application</title>
      </Head>
      <main className="h-screen max-h-screen">
        <ApplicationForm />
      </main>
    </>
  );
}
