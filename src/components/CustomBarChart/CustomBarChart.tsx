import { useEffect, useState } from "react";
import styles from "./chart.module.css";

type TElement = {
  label: string;
  value: number;
};

type ChartProps = {
  data?: TElement[];
  maxValue: number;
};

type BarProps = {
  color: string;
  height: string;
  width: string;
  label: string;
  value: number;
};

const Bar = (props: BarProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={styles.bar}
      style={{
        background: showTooltip ? `${props.color}88` : props.color,
        height: props.height,
        width: props.width,
      }}
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={styles.barTooltip}>
        {props.label}: {props.value}
      </div>
    </div>
  );
};

export const CustomBarChart = (props: ChartProps) => {
  const { data, maxValue } = props;
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

  return (
    <div className={styles.chartWrapper}>
      <div style={{ position: "absolute", top: "-8px", left: "22px" }}>
        {maxValue}
      </div>
      <div
        className={styles.chart}
        style={{
          gap: `${data?.length && 100 / data.length}px`,
        }}
      >
        {data?.map((el, idx) => {
          const height = Math.floor((el.value / maxValue) * 100);
          const width = 100 / data.length;
          const color = colors[idx];
          return (
            <Bar
              {...el}
              height={`${height}%`}
              width={`${width}%`}
              color={color!}
              key={idx}
            />
          );
        })}
      </div>
      <ul className={styles.labelsList}>
        {data?.map((el, idx) => {
          return (
            <li className={styles.label} key={idx}>
              <div
                className={styles.labelColor}
                style={{ background: colors[idx] }}
              />
              <span className={styles.labelName}>{el.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
