import styles from "./list.module.css";

type TItem = {
  label: string;
  value: number;
};

type ListProps = {
  data: TItem[] | undefined;
  maxValue: number | undefined;
};

type ListItemProps = TItem & {
  maxValue: number;
  idx: number;
};

const colors = [
  "#FF6F59",
  "#71A9F7",
  "#6B5CA5",
  "#72195A",
  "#4C1036",
  "#6C2EA5",
  "#7FA2A5",
  "#1F4BB3",
];

const ListItem = (props: ListItemProps) => {
  const { label, value, maxValue, idx } = props;
  const percent = (value / maxValue!) * 100;

  return (
    <li className={styles.listItem}>
      <div className={styles.itemLabel}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className={styles.itemBar}>
        <div
          className={styles.itemBarFiller}
          style={{
            background: colors[idx],
            width: `${percent}%`,
          }}
        />
        <span className={styles.fillPercent}>{percent.toFixed(2)} %</span>
      </div>
    </li>
  );
};

export const StatusList = (props: ListProps) => {
  const { data, maxValue } = props;
  return (
    <ul className={styles.list}>
      {data?.map((el, idx) => {
        return <ListItem {...el} maxValue={maxValue!} idx={idx} />;
      })}
    </ul>
  );
};
