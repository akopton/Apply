import { Application, Prisma } from "@prisma/client";
import styles from "./list.module.css";
import Link from "next/link";
import { getFullDateString } from "@/utils/getFullDateString";

type ApplicationWithStatus = Prisma.ApplicationGetPayload<{
  include: { statusUpdates: { include: { status: true } } };
}>;

type ListProps = {
  data: ApplicationWithStatus[];
};

type ListItemProps = ApplicationWithStatus;

const ListItem = (props: ListItemProps) => {
  const { id, position, company, statusUpdates } = props;
  const sentStatus = statusUpdates.filter((el) => el.status.name === "sent");
  const sentDate = sentStatus[0]?.updatedAt;
  return (
    <li className={styles.listItem}>
      <Link
        href={{
          pathname: "/applications/[id]",
          query: {
            id: id,
            slug: position,
          },
        }}
        className="flex flex-col items-start"
      >
        <span>{position}</span>
        <span>{company}</span>
        <span>{getFullDateString(sentDate!)}</span>
      </Link>
    </li>
  );
};

export const ApplicationsList = ({ data }: ListProps) => {
  return (
    <ul className={styles.list}>
      {data.map((el) => {
        return <ListItem key={el.id} {...el} />;
      })}
    </ul>
  );
};
