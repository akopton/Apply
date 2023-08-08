import { Application } from "@prisma/client";
import styles from "./list.module.css";
import { getFullDateString } from "@/utils/getFullDateString";

type ListProps<T> = {
  data: T[];
};

type ItemProps = Application;

const ListItem = (props: ItemProps) => {
  return (
    <li className={styles.listItem}>
      <span>{props.position}</span>
      <span>{props.company}</span>
      <span>{getFullDateString(props.addedAt)}</span>
    </li>
  );
};

export const CustomList = <T extends ItemProps>(props: ListProps<T>) => {
  const { data } = props;
  return (
    <ul className={styles.list}>
      {data.map((el) => {
        return <ListItem {...el} key={el.id} />;
      })}
    </ul>
  );
};
