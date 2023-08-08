import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ApplicationPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const application = api.application.getSingleById.useQuery(id);

  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <main>
        {application.data && (
          <div>
            <span>{application.data.position}</span>
            <span>{application.data.company}</span>
          </div>
        )}
      </main>
    </>
  );
}
