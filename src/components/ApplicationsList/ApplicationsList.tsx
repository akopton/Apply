import { Application } from "@prisma/client";
import styles from "./list.module.css";
import Link from "next/link";
import { getFullDateString } from "@/utils/getFullDateString";

type ListProps = {
  data: Application[];
};

type ListItemProps = Application;

const ListItem = (props: ListItemProps) => {
  const { id, position, company, addedAt } = props;
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
        <span>{getFullDateString(addedAt)}</span>
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
