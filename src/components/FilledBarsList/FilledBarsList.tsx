import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./list.module.css";
import { useAnimatedValue } from "@/utils/useAnimatedValue";

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
  const [startAnimation, setStartAnimation] = useState(false);
  const { label, value, maxValue, idx } = props;
  const percent = (value / maxValue!) * 100;
  const { animatedValue } = useAnimatedValue(0, percent, startAnimation, 800);
  const itemRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    const onScroll = () => {
      const bottomWindowBorderOffset =
        window.scrollY + window.innerHeight - itemRef.current?.scrollHeight!;
      if (bottomWindowBorderOffset > itemRef.current?.offsetTop!) {
        setStartAnimation(true);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <li className={styles.listItem} ref={itemRef}>
      <div className={styles.itemLabel}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className={styles.itemBar}>
        <div
          className={`${styles.itemBarFiller!} ${
            startAnimation && styles.animated!
          } `}
          style={{
            background: colors[idx],
            width: startAnimation ? `${percent}%` : "0%",
          }}
        />
        <span className={styles.fillPercent}>{animatedValue.toFixed(2)} %</span>
      </div>
    </li>
  );
};

export const StatusList = (props: ListProps) => {
  const { data, maxValue } = props;
  return (
    <ul className={styles.list}>
      {data?.map((el, idx) => {
        return <ListItem {...el} maxValue={maxValue!} idx={idx} key={idx} />;
      })}
    </ul>
  );
};
