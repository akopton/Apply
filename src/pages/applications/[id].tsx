import { CustomBtn } from "@/components/CustomBtn/CustomBtn";
import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ApplicationPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const application = api.application.getSingleById.useQuery(id);
  const { mutateAsync: deleteWithId } =
    api.application.deleteWithId.useMutation();

  const deleteApplication = async () => {
    if (!id) return;

    await deleteWithId(id);
  };

  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <main className="flex w-full flex-col items-center gap-5 p-10">
        {application.data && (
          <div>
            <div className="border-b-2 border-secondaryColor p-3">
              <h2 className="text-xl">Position</h2>
              <span className="text-2xl">{application.data.position}</span>
            </div>
            <div className="border-b-2 border-secondaryColor p-3">
              <h2 className="text-xl">Company</h2>
              <span className="text-2xl">{application.data.company}</span>
            </div>
            <div className="border-b-2 border-secondaryColor p-3">
              <h2 className="text-xl">Platform</h2>
              <span className="text-2xl">{application.data.platform.url}</span>
            </div>
            <div className="border-b-2 border-secondaryColor p-3">
              <h2 className="text-xl">Status</h2>
              <span className="flex items-center justify-between text-2xl">
                <span>{application.data.status.name}</span>
                <span>icon</span>
              </span>
            </div>

            <div>
              <h2>Updates history V</h2>
              <ul>
                {application.data.statusUpdates.map((el) => {
                  return (
                    <li key={el.id}>
                      <span>{el.status.name}</span>
                      <span>{el.updatedAt.toLocaleDateString()}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        {/* <CustomBtn
          type="button"
          text="delete"
          onClick={deleteApplication}
          additionalStyles={{ fontSize: "20px" }}
        /> */}
      </main>
    </>
  );
}
