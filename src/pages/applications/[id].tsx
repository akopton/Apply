import { ActionsModal } from "@/components/ActionsModal/ActionsModal";
import { CustomBtn } from "@/components/CustomBtn/CustomBtn";
import { ExpandableList } from "@/components/ExpandableList/ExpandableList";
import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoReturnDownBack } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";

export default function ApplicationPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const application = api.application.getSingleById.useQuery(id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [applicationStatus, setApplicationStatus] = useState(
    application.data?.status.name
  );
  const [showStatusEdit, setShowStatusEdit] = useState(false);

  const { mutateAsync: deleteWithId } =
    api.application.deleteWithId.useMutation();

  const { data: availableStatusList } = api.status.getAll.useQuery();
  const { mutateAsync: newStatusUpdate } =
    api.statusUpdate.addNew.useMutation();

  const { mutateAsync: updateApplication } =
    api.application.updateStatusWithId.useMutation();

  const deleteApplication = async () => {
    if (!id) return;
    const result = await deleteWithId(id);
    if (result) {
      router.back();
    }
  };

  const updateApplicationStatus = async (status: string) => {
    if (!application?.data?.id) return;
    await updateApplication({
      id: application.data.id,
      status: status,
    });
    await newStatusUpdate({
      status,
      applicationId: application.data?.id,
      updatedAt: new Date(),
    });

    await application.refetch();
  };

  useEffect(() => {
    setApplicationStatus(application.data?.status.name);
  }, [application.data]);

  return (
    <>
      <Head>
        <title>{router.query.slug}</title>
      </Head>
      <main className="flex w-full flex-col items-center gap-5 p-5">
        <div className="flex w-full items-center justify-between">
          <CustomBtn
            icon={<IoReturnDownBack fontSize={30} />}
            iconPlacement="beforeText"
            type="button"
            text="Go back"
            onClick={() => router.back()}
            additionalStyles={{ border: "none", fontSize: "20px" }}
          />
          <CustomBtn
            type="button"
            text="delete"
            onClick={() => setShowDeleteModal(true)}
            additionalStyles={{ fontSize: "20px" }}
          />
        </div>
        {application.data && (
          <div className="">
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
                <span>{applicationStatus}</span>
                <AiFillEdit
                  onClick={() => {
                    if (applicationStatus === "rejected") return;
                    setShowStatusEdit(true);
                  }}
                  style={{
                    opacity: applicationStatus === "rejected" ? ".4" : "1",
                  }}
                />
              </span>
            </div>
          </div>
        )}
        <ActionsModal
          isModalOpened={showDeleteModal}
          close={() => setShowDeleteModal(false)}
          title={`Are you sure to delete this application?`}
        >
          <div className="flex w-full items-center justify-around p-5">
            <CustomBtn
              type="button"
              text="Delete"
              onClick={deleteApplication}
              additionalStyles={{ fontSize: "24px", padding: "6px 12px" }}
            />
            <CustomBtn
              type="button"
              text="Cancel"
              onClick={() => setShowDeleteModal(false)}
              additionalStyles={{
                fontSize: "24px",
                borderColor: "var(--secondary-color)",
                padding: "6px 12px",
              }}
            />
          </div>
        </ActionsModal>

        <ExpandableList
          headerText="Updates history"
          headerIcon={<MdOutlineExpandMore />}
        >
          {application?.data?.statusUpdates.map((el) => {
            return (
              <li
                key={el.id}
                className="flex w-full items-center justify-between"
              >
                <span>{el.status.name}</span>
                <span>{el.updatedAt.toLocaleDateString()}</span>
              </li>
            );
          })}
        </ExpandableList>

        <ActionsModal
          title="Pick new status"
          isModalOpened={showStatusEdit}
          close={() => setShowStatusEdit(false)}
        >
          <ul className="flex h-full w-full flex-col gap-4 px-4 py-2">
            {availableStatusList
              ?.filter((el) => el.name !== applicationStatus)
              .map((el) => {
                return (
                  <li
                    className="border-2 border-red-500"
                    key={el.id}
                    onClick={async () => {
                      await updateApplicationStatus(el.name);
                      setShowStatusEdit(false);
                    }}
                  >
                    {el.name}
                  </li>
                );
              })}
          </ul>
        </ActionsModal>
      </main>
    </>
  );
}
